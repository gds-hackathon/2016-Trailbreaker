-- create database hackathon;

-- grant all privileges on hackathon.* to "hackathon"@"%" identified by 'hackath0n!';

use hackathon;


create table `employees` (
	employee_id int auto_increment key,
    employee_name nvarchar(50) not null,
    create_date datetime,
    change_date datetime,
    change_by varchar(50)
);

select * FROM employees;

insert into `employees` (employee_name, create_date, change_date, change_by)
values('sam', now(), now(), 'admin');
