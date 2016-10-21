SELECT SUM(temp.discount_amount) as total_pays, temp.month FROM (SELECT (request_amount - paid_amount) as discount_amount,DATE_FORMAT(transaction_date,'%Y%m') as `month` FROM `transaction` where transaction_status_key = 1) as temp group by temp.month;

select temp.total_pays, vd.vendor_name,vd.vendor_address from (SELECT SUM((request_amount - paid_amount)) as total_pays, vendor_key FROM `transaction` where transaction_status_key = 1 group by vendor_key) as temp 
inner join vendor vd on temp.vendor_key = vd.vendor_key;

select temp.total_pays, vd.vendor_name,vd.vendor_address from (SELECT SUM(request_amount) as total_pays, vendor_key FROM `transaction` where transaction_status_key = 1 group by vendor_key) as temp 
inner join vendor vd on temp.vendor_key = vd.vendor_key;

select temp.total_pays, concat(em.first_name,' ',em.last_name) as employee_name,em.employee_id from (SELECT SUM(request_amount) as total_pays, employee_key FROM `transaction` where transaction_status_key = 1 group by employee_key) as temp 
inner join employee em on temp.employee_key = em.employee_key;


select temp.times, vd.vendor_name,vd.vendor_address from (SELECT count(1) as times, vendor_key FROM `transaction` where transaction_status_key = 1 group by vendor_key) as temp 
inner join vendor vd on temp.vendor_key = vd.vendor_key;

