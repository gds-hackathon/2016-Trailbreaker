
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
[DONE] [POST]       /api/employee/updatestatus
[DONE] [GET|POST]   /api/transaction
[DONE] [GET]        /api/transaction/:transaction_key
[DONE] [GET]        /api/transaction/wechat_id/:wechat_id/:transaction_key
[DONE] [GET]        /api/transaction/qrcode/wechat_id/:wechat_id/:transaction_key?wechat_id=<wechat_id>&...

==PAGES==
NOTE: URL starts with /pages/ will get signature valiation.
[DONE] [GET]        /pages/registration?wechat_id=<wechat_id>&...
[DONE] [GET]        /pages/transaction?wechat_id=<wechat_id>&...
[DONE] [GET]        /pages/transaction/wechat_id/:wechat_id/:transaction_key?wechat_id=<wechat_id>&...

==ADMIN PORTAL==
/admin

==Database Design==
Please refer to /script folder.

==TODO==
A LOT TODOs



