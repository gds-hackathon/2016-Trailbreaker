

-- create database hackathon;

-- grant all privileges on hackathon.* to "slin"@"%" identified by 'DBPa$$w0rd';

-- use hackathon;

DROP TABLE IF EXISTS `coupon_type`;
create table `coupon_type` (
	coupon_type_key int,
    coupon_name nvarchar(20),
    description nvarchar(100),
    PRIMARY KEY (`coupon_type_key`)
);


drop table if exists `coupon`;
create table `coupon` (
	coupon_key int auto_increment key,
    coupon_type_key int,
    content varchar(50),
    is_enabled tinyint,
	create_date datetime,
    change_date datetime,
    change_by varchar(50)
);


-- daily
-- weekly
-- monthly
DROP TABLE IF EXISTS `limit_period`;
create table `limit_period` (
	limit_period_key int,
    period varchar(10),
    PRIMARY KEY (`limit_period_key`)
);


drop table if exists `transaction_status`;
create table `transaction_status` (
	transaction_status_key int,
    transaction_status varchar(10),
    PRIMARY KEY (`transaction_status_key`)
);


-- execed limit
-- user is disabled
-- vendor is disabled
-- coupon is disabled
drop table if exists `transaction_status_resone`;
create table `transaction_status_resone` (
	transaction_status_resone_key int,
    content nvarchar(200),
    PRIMARY KEY (`transaction_status_resone_key`) 
);




DROP TABLE IF EXISTS `employee`;
create table `employee` (
	employee_key int auto_increment key,
    first_name nvarchar(20),
    last_name nvarchar(20), 
    phone char(11),
    email_address nvarchar(50),
    employee_id nvarchar(20),
    employee_token nvarchar(10),
    wechat_id nvarchar(50),
    is_approved tinyint,
    is_enabled tinyint,
    approved_date datetime,
    create_date datetime,
    change_date datetime,
    change_by varchar(50)
);



DROP TABLE IF EXISTS `vendor`;
create table `vendor` (
    vendor_key int auto_increment key,
    vendor_name nvarchar(50),
    vendor_token nvarchar(10),
    vendor_address nvarchar(100),
    coupon_key int,
    discount decimal(2,2),
    phone varchar(11),
    email_address nvarchar(50),
    encrypted_security_token nvarchar(100),
    is_enabled tinyint,
    create_date datetime,
    change_date datetime,
    change_by varchar(50)
);


drop table if exists `transaction`;
create table `transaction` (
    transaction_key int auto_increment key,
    employee_key int,
    attendances numeric,
    vendor_key int,
    coupon_key int,
    discount decimal(2,2),
    transaction_date datetime,
    request_amount decimal(7,2),
    paid_amount decimal(7,2),
    transaction_status_key int,
    transaction_status_resone_key int,
    create_date datetime,
    change_date datetime,
    change_by varchar(50)
);

drop table if exists `employee_limit`;
create table `employee_limit` (
	employee_limit_key int auto_increment key,
    employee_key int,
    max_amount decimal(7,2),
    max_count int,
    limit_period_key int,
    is_enabled tinyint
);



drop table if exists `user`;
create table `user`(
    user_key int auto_increment key,
    employee_key int,
    user_name nvarchar(50),
    phone char(11),
    email_address varchar(50),
    user_password nvarchar(50),
    is_enabled tinyint
);