
--------------------------------------------------------
USER CASE:
- 关注公众号
- 发送“zhuche”, "注册"进行注册； 注册成功，需要后台审批！
- 发送“discout”,"dazhe","打折"
--------------------------------------------------------

==Folder Structure==
- /src      SOURCE CODE
- /script   DB SCRIPTS
- /doc      DOCUMENTS


HOW TO RUN:
> cd src/
> npm install
> npm start or SET PORT=80 & npm start
then visit http://localhost:<PORT:default is 3000>



==API==
[DONE] [GET]        /api/vendor
[DONE] [GET]        /api/vendor/:vendor_token
[DONE] [GET]        /api/employee
[DONE] [GET]        /api/employee/:employee_key
[DONE] [GET]        /api/employee/:employee_token
[DONE] [GET]        /api/employee/wechat_id/:wechat_id
[DONE] [POST]       /api/employee/register/wechat_id/:wechat_id?QUERYSTRING
[DONE] [POST]       /api/employee/updatestatus
[DONE] [GET]        /api/transaction
[DONE] [GET]        /api/transaction/:transaction_key
[DONE] [POST]       /api/transaction/wechat_id/:wechat_id?QUERYSTRING
[DONE] [GET]        /api/transaction/wechat_id/:wechat_id?QUERYSTRING
[DONE] [GET]        /api/transaction/wechat_id/:wechat_id/:transaction_key
[DONE] [GET]        /api/transaction/qrcode/wechat_id/:wechat_id/:transaction_key?wechat_id=<wechat_id>&...

==PAGES==
NOTE: URL starts with /pages/ will get signature valiation.
[DONE] [GET]        /pages/transaction?wechat_id=<wechat_id>&...
[DONE] [GET]        /pages/transaction/wechat_id/:wechat_id/:transaction_key?wechat_id=<wechat_id>&...

==ADMIN PORTAL==
/admin

==Database Design==
Please refer to /script folder.

==TODO==
SECURITY
A LOT TODOs



