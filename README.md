# SEPickerV2
Overhaul of https://github.com/tangboxuan/SEPicker using React

Website available here: https://sepickerv2.herokuapp.com/
WORK IN PROGRESS


For Future Maintenance/Upgrades:
1. Add notebook for updating of mappings (modules, universities, countries etc)
	1.1 Note: Some manual work needs to be done for checking which country a *new* university is in.
	1.2 Use old mappings to generate new mappings
2. Migrate switch to a SQL backend so the server need not be down when updating database
	2.1 We need to restart our flask application whenever our mappings change
