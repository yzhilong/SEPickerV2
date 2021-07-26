import pandas as pd
import numpy as np
import json, requests, time
import pycountry_convert as pc


mappings = pd.read_csv("cleaned_mappings.csv")

with open('equivalentModuleMappings.json','r') as f:
    equivalent_module_mappings = json.load(f)

def get_equivalent_modules(modules, equivalent_module_mappings=equivalent_module_mappings):
    output = set()
    for module in modules:
        output.update(set(equivalent_module_mappings[module]))
    return output

def get_equivalent_modules_inverse(modules, equivalent_module_mappings=equivalent_module_mappings):
    equivalent_modules = {module: get_equivalent_modules([module]) for module in modules}
    output = {}
    for module in equivalent_modules:
        for equiv in equivalent_modules[module]:
            output[equiv] = module
    return output


modified_mappings = pd.read_csv('cleaned_mappings_with_locations.csv')

def get_department(title):
    end_index = 0
    for i, char in enumerate(title):
        if not char.isalpha():
            end_index = i
            break
    return title[:end_index]
    
def department_filter(departments, mappings=modified_mappings):
    if len(departments) == 0:
        return mappings

    filter_function = lambda title : (type(title) == str) and (get_department(title) in departments)
    return mappings[mappings['NUS Module 1'].map(filter_function) | mappings['NUS Module 2'].map(filter_function)]


def module_filter(modules, mappings=modified_mappings):
    if len(modules) == 0:
        return mappings
    
    equivalent_modules = get_equivalent_modules(modules)
    filter_function = lambda title: (title is not np.nan) and ((title in equivalent_modules) or (title[:-1] in equivalent_modules))
    return mappings[mappings['NUS Module 1'].map(filter_function) | mappings['NUS Module 2'].map(filter_function)]

def school_filter(schools, mappings=modified_mappings):
    if len(schools) == 0:
        return mappings
    
    filter_function = lambda school: school in schools
    return mappings[mappings['Partner University'].map(filter_function)]

def essential_module_filter(modules, mappings=modified_mappings):
    if modules == []:
        output = mappings.to_dict()
        for key in output:
            output[key] = []
        return pd.DataFrame(output)
    
    schools = set(mappings['Partner University'])
    for module in modules:
        schools_with_mod = set(module_filter([module],mappings=mappings)['Partner University'])
        schools.intersection_update(schools_with_mod)
    if len(schools) != 0:
        output = module_filter(modules,school_filter(schools,mappings=mappings))
        output.sort_values('Partner University',inplace=True)
    else:
        output = mappings.to_dict()
        for key in output:
            output[key] = []
        output = pd.DataFrame(output)
    return output

def optional_module_filter(modules, mappings=modified_mappings):
    schools = set()
    for module in modules:
        schools_with_mod = set(module_filter([module],mappings=mappings)['Partner University'])
        schools.update(schools_with_mod)
    output = module_filter(modules,school_filter(schools,mappings=mappings))
    output.sort_values('Partner University',inplace=True)
    return output


def algorithm(essential_modules,optional_modules=[],schools=[],countries=[],continents=[],mappings=modified_mappings):
    """
    Returns a dictionary with key-value pairs being universities and the mappings of NUS modules to
    partner university modules. 
    
    output = {
        uni1: {NUS_mod1: [NUS_mod1_title, [[PU_mod1, PU_mod1_title], [PU_mod1, PU_mod1_title], ...]]},
    }
    """
    if continents != []:
        is_valids = [continent in continents for continent in mappings['Continent']]
        mappings = mappings[is_valids]
        
    if countries != []:
        is_valids = [country in countries for country in mappings['Country']]
        mappings = mappings[is_valids]
    
    
    if schools != []:
        restricted_by_school = school_filter(schools,mappings)
    else:
        restricted_by_school = mappings
    
    restricted_by_essential_modules = essential_module_filter(essential_modules, restricted_by_school)
    schools_with_essential_modules = restricted_by_essential_modules['Partner University'].unique()
    truth_series = [school in schools_with_essential_modules for school in mappings['Partner University']]
    valid_schools_with_optional_modules = mappings[truth_series]
    
    output_df = restricted_by_essential_modules
    if optional_modules != []:
        tmp_df = optional_module_filter(optional_modules, valid_schools_with_optional_modules)
        output_df = output_df.append(tmp_df)
    output_df.sort_values('Partner University',inplace=True)
    
    output_dict = {continent: {} for continent in output_df['Continent'].unique()}
    full_continent_name = {
        'AF': 'Africa',
        'AS': 'Asia',
        'EU': 'Europe',
        'NA': 'North America',
        'OC': 'Oceania',
        'SA': 'South America'
    }
    inverse_module_mappings = get_equivalent_modules_inverse(essential_modules + optional_modules)
    for i in range(len(output_df)):
        row = output_df.iloc[i]
        country_code = pc.country_name_to_country_alpha2(row['Country'], cn_name_format="default")
        continent = pc.country_alpha2_to_continent_code(country_code)

        continent_dict = output_dict[full_continent_name[continent]]
        if row['Country'] not in output_dict[full_continent_name[continent]]:
            continent_dict[row['Country']] = {}

        country_dict = continent_dict[row['Country']]
        if row['Partner University'] not in continent_dict[row['Country']]:
            country_dict[row['Partner University']] = {}

        if row['NUS Module 1'] is not np.nan:
            module_name = row['NUS Module 1']
            module_title = row['NUS Module 1 Title']
        else:
            module_name = row['NUS Module 2']
            module_title = row['NUS Module 2 Title']

        uni_dict = country_dict[row['Partner University']]
        if inverse_module_mappings[module_name] not in uni_dict:
            uni_dict[inverse_module_mappings[module_name]] = {module_name: []}
        elif module_name not in uni_dict[inverse_module_mappings[module_name]]:
            uni_dict[inverse_module_mappings[module_name]][module_name] = [] # This array should be a list of mappings
        

        if row['PU Module 1'] is not np.nan:
            relevant_dict = uni_dict[inverse_module_mappings[module_name]][module_name]
            pu_module_name = row['PU Module 1']
            pu_module_title = row['PU Module 1 Title']
            relevant_dict.append({'PU Module Code': pu_module_name, 'PU Module Title': pu_module_title})
        if row['PU Module 2'] is not np.nan:
            relevant_dict = uni_dict[inverse_module_mappings[module_name]][module_name]
            pu_module_name = row['PU Module 2']
            pu_module_title = row['PU Module 2 Title']
            relevant_dict.append({'PU Module Code': pu_module_name, 'PU Module Title': pu_module_title})
    
    tmp_dict = {}
    for continent in sorted(output_dict.keys()):
        tmp_dict[continent] = {}
        for country in sorted(output_dict[continent].keys()):
            tmp_dict[continent][country] = {}
            for school in sorted(output_dict[continent][country].keys()):
                tmp_dict[continent][country][school] = {"num_mappable": 0, "mappings": {}}
                for module in sorted(output_dict[continent][country][school].keys()):
                    tmp_dict[continent][country][school]["mappings"][module] = output_dict[continent][country][school][module]
                    if tmp_dict[continent][country][school][module] != []:
                        tmp_dict[continent][country][school]["num_mappable"] += 1
    
    return tmp_dict

def display_result(result):
    tab = '    '
    for continent in result:
        print(continent)
        for country in result[continent]:
            print(tab + country)
            for school in result[continent][country]:
                print(f"{2*tab}{school}, {result[continent][country][school]['num_mappable']}")
                for module in result[continent][country][school]:
                    if module == "num_mappable":
                        continue
                    print(3*tab+module)
                    for equivalent in result[continent][country][school][module]:
                        print(4*tab + str(equivalent))
                        for mapping in result[continent][country][school][module][equivalent]:
                            print(5*tab + str(mapping))
