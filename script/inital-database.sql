-- create database hackathon;

-- grant all privileges on hackathon.* to "slin"@"%" identified by 'DBPa$$w0rd';

-- use hackathon;


create table `employees` (
	employee_id int auto_increment key,
    employee_name nvarchar(50) not null,
    create_date datetime,
    change_date datetime,
    change_by varchar(50)
);