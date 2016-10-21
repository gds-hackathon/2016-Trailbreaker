-- coupon_type
insert into coupon_type(coupon_type_key,coupon_name, description) values (1,'discount', 'cut down the amount by x%');


-- coupon
INSERT INTO `hackathon`.`coupon`
(`coupon_type_key`,
`content`,
`is_enabled`,
`create_date`,
`change_date`,
`change_by`)
VALUES
(1,
20,
1,
now(),
now(),
user());


-- limit_period
insert into limit_period(limit_period_key,period) values (1,'daily');
insert into limit_period(limit_period_key,period) values (2,'weekly');
insert into limit_period(limit_period_key,period) values (3,'monthly');


-- transaction_status
INSERT INTO `hackathon`.`transaction_status`
(`transaction_status_key`,
`transaction_status`)
VALUES
(1,
'success');
INSERT INTO `hackathon`.`transaction_status`
(`transaction_status_key`,
`transaction_status`)
VALUES
(2,
'pending');
INSERT INTO `hackathon`.`transaction_status`
(`transaction_status_key`,
`transaction_status`)
VALUES
(3,
'fail');


-- transaction_status_resone
INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(1,
'success');

INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(2,
'execed daily limit');

INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(3,
'execed weekly limit');

INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(4,
'execed monthly limit');

INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(5,
'employee is disabled');

INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(6,
'coupon is disabled');

INSERT INTO `hackathon`.`transaction_status_resone`
(`transaction_status_resone_key`,
`content`)
VALUES
(7,
'vendor is disabled');


-- employee
INSERT INTO `hackathon`.`employee`
(`first_name`,
`last_name`,
`phone`,
`email_address`,
`employee_id`,
`employee_token`,
`wechat_id`,
`is_approved`,
`is_enabled`,
`approved_date`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('sam',
'shen',
'18601667692',
'sam.shen@greendotcorp.com',
'gd-886',
'ext-866',
'18601667692',
1,
0,
now(),
now(),
now(),
user());

INSERT INTO `hackathon`.`employee`
(`first_name`,
`last_name`,
`phone`,
`email_address`,
`employee_id`,
`employee_token`,
`wechat_id`,
`is_approved`,
`is_enabled`,
`approved_date`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('jim',
'sun',
'12345678910',
'jim.sun@greendotcorp.com',
'gd-666',
'ext-666',
'12345678910',
0,
0,
null,
now(),
now(),
user());
INSERT INTO `hackathon`.`employee`
(`first_name`,
`last_name`,
`phone`,
`email_address`,
`employee_id`,
`employee_token`,
`wechat_id`,
`is_approved`,
`is_enabled`,
`approved_date`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('shawn',
'lin',
'12345678911',
'shawn.lin@greendotcorp.com',
'gd-888',
'ext-888',
'1234567891',
0,
0,
null,
now(),
now(),
user());
INSERT INTO `hackathon`.`employee`
(`first_name`,
`last_name`,
`phone`,
`email_address`,
`employee_id`,
`employee_token`,
`wechat_id`,
`is_approved`,
`is_enabled`,
`approved_date`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('steven',
'shi',
'12345678912',
'steven.shi@greendotcorp.com',
'gd-668',
'ext-668',
'12345678912',
0,
0,
null,
now(),
now(),
user());


-- vendor
INSERT INTO `hackathon`.`vendor`
(`vendor_name`,
`vendor_token`,
`vendor_address`,
`coupon_key`,
`phone`,
`discount`,
`email_address`,
`encrypted_security_token`,
`is_enabled`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('赤坂亭',
'cbt',
'长泰广场',
1,
'18601667692',
'0.20',
'sam.shen@greendotcorp.com',
'this is cbt',
1,
NOW(),
NOW(),
USER());
INSERT INTO `hackathon`.`vendor`
(`vendor_name`,
`vendor_token`,
`vendor_address`,
`coupon_key`,
`phone`,
`discount`,
`email_address`,
`encrypted_security_token`,
`is_enabled`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('花隐',
'hy',
'长泰广场',
1,
'18601667692',
'0.20',
'sam.shen@greendotcorp.com',
'this is hy',
0,
NOW(),
NOW(),
USER());
INSERT INTO `hackathon`.`vendor`
(`vendor_name`,
`vendor_token`,
`vendor_address`,
`coupon_key`,
`phone`,
`discount`,
`email_address`,
`encrypted_security_token`,
`is_enabled`,
`create_date`,
`change_date`,
`change_by`)
VALUES
('望湘园',
'wxy',
'长泰广场',
1,
'18601667692',
'0.20',
'sam.shen@greendotcorp.com',
'this is wxy',
0,
NOW(),
NOW(),
USER());


-- transaction
INSERT INTO `hackathon`.`transaction`
(`employee_key`,
`attendances`,
`vendor_key`,
`coupon_key`,
`discount`,
`transaction_date`,
`request_amount`,
`paid_amount`,
`transaction_status_key`,
`transaction_status_resone_key`,
`create_date`,
`change_date`,
`change_by`)
VALUES
(1,
4,
1,
1,
0.2,
now(),
500,
400,
1,
1,
now(),
now(),
user());

INSERT INTO `hackathon`.`transaction`
(`employee_key`,
`attendances`,
`vendor_key`,
`coupon_key`,
`discount`,
`transaction_date`,
`request_amount`,
`paid_amount`,
`transaction_status_key`,
`transaction_status_resone_key`,
`create_date`,
`change_date`,
`change_by`)
VALUES
(1,
4,
1,
1,
null,
now(),
500,
null,
3,
2,
now(),
now(),
user());

INSERT INTO `hackathon`.`transaction`
(`employee_key`,
`attendances`,
`vendor_key`,
`coupon_key`,
`discount`,
`transaction_date`,
`request_amount`,
`paid_amount`,
`transaction_status_key`,
`transaction_status_resone_key`,
`create_date`,
`change_date`,
`change_by`)
VALUES
(2,
4,
1,
1,
null,
now(),
1000,
null,
3,
5,
now(),
now(),
user());


-- employee_limit
INSERT INTO `hackathon`.`employee_limit`
(`employee_key`,
`max_amount`,
`max_count`,
`limit_period_key`,
`is_enabled`)
VALUES
(1,
500,
null,
1,
1);
INSERT INTO `hackathon`.`employee_limit`
(`employee_key`,
`max_amount`,
`max_count`,
`limit_period_key`,
`is_enabled`)
VALUES
(1,
500,
null,
2,
1);
INSERT INTO `hackathon`.`employee_limit`
(`employee_key`,
`max_amount`,
`max_count`,
`limit_period_key`,
`is_enabled`)
VALUES
(1,
500,
null,
3,
1);

INSERT INTO `hackathon`.`employee_limit`
(`employee_key`,
`max_amount`,
`max_count`,
`limit_period_key`,
`is_enabled`)
VALUES
(2,
500,
null,
1,
1);
INSERT INTO `hackathon`.`employee_limit`
(`employee_key`,
`max_amount`,
`max_count`,
`limit_period_key`,
`is_enabled`)
VALUES
(2,
500,
null,
2,
1);
INSERT INTO `hackathon`.`employee_limit`
(`employee_key`,
`max_amount`,
`max_count`,
`limit_period_key`,
`is_enabled`)
VALUES
(2,
500,
null,
3,
1);


-- user
INSERT INTO `hackathon`.`user`
(`employee_key`,
`user_name`,
`phone`,
`email_address`,
`user_password`,
`is_enabled`)
VALUES
(1,
'sshen',
'18601667692',
'sam.shen@greendotcorp.com',
'123456',
1);
