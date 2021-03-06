{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import numpy as np\n",
    "import json, requests, time\n",
    "\n",
    "import pycountry_convert as pc"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Faculty</th>\n",
       "      <th>Partner University</th>\n",
       "      <th>PU Module 1</th>\n",
       "      <th>PU Module 1 Title</th>\n",
       "      <th>PU Mod1 Credits</th>\n",
       "      <th>PU Module 2</th>\n",
       "      <th>PU Module 2 Title</th>\n",
       "      <th>PU Mod2 Credits</th>\n",
       "      <th>NUS Module 1</th>\n",
       "      <th>NUS Module 1 Title</th>\n",
       "      <th>NUS Mod1 Credits</th>\n",
       "      <th>NUS Module 2</th>\n",
       "      <th>NUS Module 2 Title</th>\n",
       "      <th>NUS Mod2 Credits</th>\n",
       "      <th>Pre Approved?</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Faculty of Arts &amp; Social Sci</td>\n",
       "      <td>The Hong Kong Polytechnic University</td>\n",
       "      <td>CBS241</td>\n",
       "      <td>Elementary Chinese II (for Non-Chinese speakin...</td>\n",
       "      <td>1.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>LAC2731</td>\n",
       "      <td>Department Exchange Module</td>\n",
       "      <td>3.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>Y</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Faculty of Arts &amp; Social Sci</td>\n",
       "      <td>The Hong Kong Polytechnic University</td>\n",
       "      <td>CC2C08</td>\n",
       "      <td>Mutual Impressions of China and the West</td>\n",
       "      <td>3.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>PS2238</td>\n",
       "      <td>Int'l Politics of NE Asia</td>\n",
       "      <td>4.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>Y</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Faculty of Arts &amp; Social Sci</td>\n",
       "      <td>Hong Kong University of Science &amp; Technology</td>\n",
       "      <td>LANG1120</td>\n",
       "      <td>Chinese for Non-Chinese Language Background St...</td>\n",
       "      <td>1.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>LAC1731</td>\n",
       "      <td>Department exchange module</td>\n",
       "      <td>3.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>Y</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>Faculty of Arts &amp; Social Sci</td>\n",
       "      <td>City University of Hong Kong</td>\n",
       "      <td>AIS3126</td>\n",
       "      <td>International Political Economy</td>\n",
       "      <td>3.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>PS3238</td>\n",
       "      <td>Int'l Political Economy</td>\n",
       "      <td>4.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>Y</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>Faculty of Arts &amp; Social Sci</td>\n",
       "      <td>City University of Hong Kong</td>\n",
       "      <td>GE2210</td>\n",
       "      <td>China: A Socio-Political Transformation</td>\n",
       "      <td>3.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>PS2248</td>\n",
       "      <td>Chinese Politics</td>\n",
       "      <td>4.0</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>Y</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                        Faculty                            Partner University  \\\n",
       "0  Faculty of Arts & Social Sci          The Hong Kong Polytechnic University   \n",
       "1  Faculty of Arts & Social Sci          The Hong Kong Polytechnic University   \n",
       "2  Faculty of Arts & Social Sci  Hong Kong University of Science & Technology   \n",
       "3  Faculty of Arts & Social Sci                  City University of Hong Kong   \n",
       "4  Faculty of Arts & Social Sci                  City University of Hong Kong   \n",
       "\n",
       "  PU Module 1                                  PU Module 1 Title  \\\n",
       "0      CBS241  Elementary Chinese II (for Non-Chinese speakin...   \n",
       "1      CC2C08           Mutual Impressions of China and the West   \n",
       "2    LANG1120  Chinese for Non-Chinese Language Background St...   \n",
       "3     AIS3126                    International Political Economy   \n",
       "4      GE2210            China: A Socio-Political Transformation   \n",
       "\n",
       "   PU Mod1 Credits PU Module 2 PU Module 2 Title  PU Mod2 Credits  \\\n",
       "0              1.0         NaN               NaN              NaN   \n",
       "1              3.0         NaN               NaN              NaN   \n",
       "2              1.0         NaN               NaN              NaN   \n",
       "3              3.0         NaN               NaN              NaN   \n",
       "4              3.0         NaN               NaN              NaN   \n",
       "\n",
       "  NUS Module 1          NUS Module 1 Title  NUS Mod1 Credits NUS Module 2  \\\n",
       "0      LAC2731  Department Exchange Module               3.0          NaN   \n",
       "1       PS2238   Int'l Politics of NE Asia               4.0          NaN   \n",
       "2      LAC1731  Department exchange module               3.0          NaN   \n",
       "3       PS3238     Int'l Political Economy               4.0          NaN   \n",
       "4       PS2248            Chinese Politics               4.0          NaN   \n",
       "\n",
       "  NUS Module 2 Title  NUS Mod2 Credits Pre Approved?  \n",
       "0                NaN               NaN             Y  \n",
       "1                NaN               NaN             Y  \n",
       "2                NaN               NaN             Y  \n",
       "3                NaN               NaN             Y  \n",
       "4                NaN               NaN             Y  "
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "mappings = pd.read_csv(\"cleaned_mappings.csv\")\n",
    "mappings.head()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "This block of code has some work done manually since there is no easy way to check\n",
    "which country each school is in"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "with open('equivalentModuleMappings.json','r') as f:\n",
    "    equivalent_module_mappings = json.load(f)\n",
    "\n",
    "def get_equivalent_modules(modules, equivalent_module_mappings=equivalent_module_mappings):\n",
    "    output = set()\n",
    "    for module in modules:\n",
    "        output.update(set(equivalent_module_mappings[module]))\n",
    "    return output"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [],
   "source": [
    "modified_mappings = pd.read_csv('cleaned_mappings_with_locations.csv')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [],
   "source": [
    "def get_department(title):\n",
    "    end_index = 0\n",
    "    for i, char in enumerate(title):\n",
    "        if not char.isalpha():\n",
    "            end_index = i\n",
    "            break\n",
    "    return title[:end_index]\n",
    "    \n",
    "def department_filter(departments, mappings=modified_mappings):\n",
    "    if len(departments) == 0:\n",
    "        return mappings\n",
    "\n",
    "    filter_function = lambda title : (type(title) == str) and (get_department(title) in departments)\n",
    "    return mappings[mappings['NUS Module 1'].map(filter_function) | mappings['NUS Module 2'].map(filter_function)]\n",
    "\n",
    "\n",
    "def module_filter(modules, mappings=modified_mappings):\n",
    "    if len(modules) == 0:\n",
    "        return mappings\n",
    "    \n",
    "    equivalent_modules = get_equivalent_modules(modules)\n",
    "    filter_function = lambda title: (title is not np.nan) and ((title in equivalent_modules) or (title[:-1] in equivalent_modules))\n",
    "    return mappings[mappings['NUS Module 1'].map(filter_function) | mappings['NUS Module 2'].map(filter_function)]\n",
    "\n",
    "def school_filter(schools, mappings=modified_mappings):\n",
    "    if len(schools) == 0:\n",
    "        return mappings\n",
    "    \n",
    "    filter_function = lambda school: school in schools\n",
    "    return mappings[mappings['Partner University'].map(filter_function)]\n",
    "\n",
    "def essential_module_filter(modules, mappings=modified_mappings):\n",
    "    schools = set(mappings['Partner University'])\n",
    "    for module in modules:\n",
    "        schools_with_mod = set(module_filter([module],mappings=mappings)['Partner University'])\n",
    "        schools.intersection_update(schools_with_mod)\n",
    "    output = module_filter(modules,school_filter(schools,mappings=mappings))\n",
    "    output.sort_values('Partner University',inplace=True)\n",
    "    return output\n",
    "\n",
    "def optional_module_filter(modules, mappings=modified_mappings):\n",
    "    schools = set()\n",
    "    for module in modules:\n",
    "        schools_with_mod = set(module_filter([module],mappings=mappings)['Partner University'])\n",
    "        schools.update(schools_with_mod)\n",
    "    output = module_filter(modules,school_filter(schools,mappings=mappings))\n",
    "    output.sort_values('Partner University',inplace=True)\n",
    "    return output"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [],
   "source": [
    "def algorithm(essential_modules,optional_modules=[],schools=[],countries=[],continents=[],mappings=modified_mappings):\n",
    "    \"\"\"\n",
    "    Returns a dictionary with key-value pairs being universities and the mappings of NUS modules to\n",
    "    partner university modules. \n",
    "    \n",
    "    output = {\n",
    "        uni1: {NUS_mod1: [NUS_mod1_title, [[PU_mod1, PU_mod1_title], [PU_mod1, PU_mod1_title], ...]]},\n",
    "    }\n",
    "    \"\"\"\n",
    "    if continents != []:\n",
    "        is_valids = [continent in continents for continent in mappings['Continent']]\n",
    "        mappings = mappings[is_valids]\n",
    "        \n",
    "    if countries != []:\n",
    "        is_valids = [country in countries for country in mappings['Country']]\n",
    "        mappings = mappings[is_valids]\n",
    "    \n",
    "    \n",
    "    if schools != []:\n",
    "        restricted_by_school = school_filter(schools,mappings)\n",
    "    else:\n",
    "        restricted_by_school = mappings\n",
    "    \n",
    "    restricted_by_essential_modules = essential_module_filter(essential_modules, restricted_by_school)\n",
    "    schools_with_essential_modules = restricted_by_essential_modules['Partner University'].unique()\n",
    "    truth_series = [school in schools_with_essential_modules for school in mappings['Partner University']]\n",
    "    valid_schools_with_optional_modules = mappings[truth_series]\n",
    "    \n",
    "    output_df = restricted_by_essential_modules\n",
    "    if optional_modules != []:\n",
    "        tmp_df = optional_module_filter(optional_modules, valid_schools_with_optional_modules)\n",
    "        output_df = output_df.append(tmp_df)\n",
    "    output_df.sort_values('Partner University',inplace=True)\n",
    "    \n",
    "    output_dict = {continent: {} for continent in output_df['Continent'].unique()}\n",
    "    full_continent_name = {\n",
    "        'AF': 'Africa',\n",
    "        'AS': 'Asia',\n",
    "        'EU': 'Europe',\n",
    "        'NA': 'North America',\n",
    "        'OC': 'Oceania',\n",
    "        'SA': 'South America'\n",
    "    }\n",
    "    for i in range(len(output_df)):\n",
    "        row = output_df.iloc[i]\n",
    "        country_code = pc.country_name_to_country_alpha2(row['Country'], cn_name_format=\"default\")\n",
    "        continent = pc.country_alpha2_to_continent_code(country_code)\n",
    "\n",
    "        continent_dict = output_dict[full_continent_name[continent]]\n",
    "        if row['Country'] not in output_dict[full_continent_name[continent]]:\n",
    "            continent_dict[row['Country']] = {}\n",
    "\n",
    "        country_dict = continent_dict[row['Country']]\n",
    "        if row['Partner University'] not in continent_dict[row['Country']]:\n",
    "            country_dict[row['Partner University']] = {}\n",
    "\n",
    "        if row['NUS Module 1'] is not np.nan:\n",
    "            module_name = row['NUS Module 1']\n",
    "            module_title = row['NUS Module 1 Title']\n",
    "        else:\n",
    "            module_name = row['NUS Module 2']\n",
    "            module_title = row['NUS Module 2 Title']\n",
    "\n",
    "        uni_dict = country_dict[row['Partner University']]\n",
    "        if module_name not in uni_dict:\n",
    "            uni_dict[module_name] = {'NUS Module Title': module_title, 'mappings': []}\n",
    "\n",
    "        if row['PU Module 1'] is not np.nan:\n",
    "            pu_module_name = row['PU Module 1']\n",
    "            pu_module_title = row['PU Module 1 Title']\n",
    "            uni_dict[module_name]['mappings'].append({'PU Module Code': pu_module_name, 'PU Module Title': pu_module_title})\n",
    "        if row['PU Module 2'] is not np.nan:\n",
    "            pu_module_name = row['PU Module 2']\n",
    "            pu_module_title = row['PU Module 2 Title']\n",
    "            uni_dict[module_name]['mappings'].append({'PU Module Code': pu_module_name, 'PU Module Title': pu_module_title})\n",
    "    \n",
    "    return output_dict"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [],
   "source": [
    "def display_result(result):\n",
    "    tab = '    '\n",
    "    for continent in result:\n",
    "        print(continent)\n",
    "        for country in result[continent]:\n",
    "            print(tab + country)\n",
    "            for school in result[continent][country]:\n",
    "                print(2*tab + school)\n",
    "                for module in result[continent][country][school]:\n",
    "                    print(3*tab+module)\n",
    "                    print(4*tab+'NUS Module Title'+': ' + result[continent][country][school][module]['NUS Module Title'])\n",
    "                    print(4*tab+'Mappings:')\n",
    "                    for mapped in result[continent][country][school][module]['mappings']:\n",
    "                        print(5*tab+f\"{mapped['PU Module Code']}: {mapped['PU Module Title']}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Asia\n",
      "    Hong Kong\n",
      "        Hong Kong University of Science & Technology\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    COMP2611: Computer Organization\n",
      "                    ELEC2300: Computer Organization\n",
      "            MA3269\n",
      "                NUS Module Title: Mathematical Finance I\n",
      "                Mappings:\n",
      "                    MATH2511: Fundamentals of Actuarial Mathematics\n",
      "                    MATH4514: Financial Economics in Actuarial Science\n",
      "            MA2108\n",
      "                NUS Module Title: Mathematical Analysis I\n",
      "                Mappings:\n",
      "                    MATH2033: Mathematical Analysis\n",
      "            ST2132\n",
      "                NUS Module Title: Mathematical Statistics\n",
      "                Mappings:\n",
      "                    MATH3423: Statistical Inference 3\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    COMP5711: Introduction to Advanced Algorithmic Techniques\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    ISOM3180: Tele communications and Computer Networking Management\n",
      "                    COMP4621: Computer Communication Networks 1\n",
      "        The Chinese University of Hong Kong\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    CSCI3160: Design and Analysis of Algorithms\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    IERG3310: Computer networks\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    CSCI2510: Computer organization\n",
      "        The University of Hong Kong\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    ELEC3443: Computer networks\n",
      "                    COMP3234: Computer and Communication Networks\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    COMP2120: Computer Organization\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    COMP3250: Design and Analysis of Algorithms\n",
      "    South Korea\n",
      "        Korea Advanced Inst of Sci & Tech\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CS341: introduction to Computer Network\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    CS311: Computer Organization\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    CS500: Design and Analysis of Algorithm\n",
      "    Taiwan\n",
      "        National Taiwan University\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    EE4020: Introduction to Computer Networks\n",
      "                    CSIE3510: Computer Networks\n",
      "                    IM3010: Computer Networks and Applications\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    9028040: Introduction to Computer Science\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    EE5048: The Design and Analysis of Algorithms\n",
      "                    CSIE2136: Algorithm Design and Analysis\n",
      "    Singapore\n",
      "        Singapore Management University\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CS204: Interconnection of Cyber Physical Systems\n",
      "                    IS204: Networking\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    CS106: Computer Hardware and Embedded Systems\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    CS602: Algorithm Design and Implementation\n",
      "                    CS202: Design and Analysis of Algorithms\n",
      "North America\n",
      "    United States of America\n",
      "        Purdue University\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    CS38100: Introduction to the Analysis of Algorithms\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CS42200: Computer Networks\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    CS25000: Computer Architecture\n",
      "            ST2132\n",
      "                NUS Module Title: Mathematical Statistics\n",
      "                Mappings:\n",
      "                    STAT52800: Introduction to Mathematical Statistics\n",
      "                    STAT41700: Statistical Theory\n",
      "        The University of Texas at Austin\n",
      "            ST2132\n",
      "                NUS Module Title: Mathematical Statistics\n",
      "                Mappings:\n",
      "                    SDS378: Introduction to Mathematical Statistics\n",
      "            MA2311\n",
      "                NUS Module Title: Techniques In Adv Calculus\n",
      "                Mappings:\n",
      "                    M408D: Sequences, Series, and Multivariable Calculus\n",
      "            MA2108\n",
      "                NUS Module Title: Mathematical Analysis I\n",
      "                Mappings:\n",
      "                    M365C: Real Analysis I\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    EE360C: Algorithms\n",
      "                    CS331: Algorithms and Complexity\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CS356: Computer Networks\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    EE306: INTRODUCTION TO COMPUTING\n",
      "                    CS429: Computer Organization and Architecture\n",
      "        University of Georgia\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CSCI4760: Computer Networks\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    CSCI4470: Algorithms\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    CSCI4720: Computer Architecture and Organization\n",
      "        University of North Carolina, Chapel Hill\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    COMP411: Computer Organisation\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    COMP431: Internet Services and Protocols\n",
      "            ST2132\n",
      "                NUS Module Title: Mathematical Statistics\n",
      "                Mappings:\n",
      "                    STOR555: Mathematical Statistics\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    COMP550: Algorithms and Analysis\n",
      "            MA2311\n",
      "                NUS Module Title: Techniques In Adv Calculus\n",
      "                Mappings:\n",
      "                    MATH521: Advanced Calculus I\n",
      "    Canada\n",
      "        University of Calgary\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    CPSC413: Design and Analysis of Algorithms I\n",
      "                    CPSC335: Intermediate Information Structures\n",
      "            ST2132\n",
      "                NUS Module Title: Mathematical Statistics\n",
      "                Mappings:\n",
      "                    STAT421: Mathematical Statistics\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CPSC441: Computer Networks\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    CPSC355: Computing Machinery I\n",
      "        University of Toronto\n",
      "            CS2100\n",
      "                NUS Module Title: Computer Organisation\n",
      "                Mappings:\n",
      "                    ECE352: Computer Organization\n",
      "            CS3230\n",
      "                NUS Module Title: Design & Analysis of Algorithm\n",
      "                Mappings:\n",
      "                    ECE358: Foundations of Computing\n",
      "                    CSC373H1: Algorithm Design, Analysis & Complexity\n",
      "            CS2105\n",
      "                NUS Module Title: Intro to Computer Networks\n",
      "                Mappings:\n",
      "                    CSC358H1: Principles of Computer Networks\n",
      "            ST2132\n",
      "                NUS Module Title: Mathematical Statistics\n",
      "                Mappings:\n",
      "                    STA261H1: Probability and Statistics II\n"
     ]
    }
   ],
   "source": [
    "essential_modules = ['CS2105','CS3230','CS2100']\n",
    "optional_modules = ['ST2132','MA2108','MA3269']\n",
    "result = algorithm(essential_modules, optional_modules,continents=['Asia','North America'])\n",
    "display_result(result)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.6"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
