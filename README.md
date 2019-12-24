# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## postsテーブル
|Colum|Type|Options|  
|-----|----|-------|  
|image|text|
|text|text|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル
|Colum|Type|Options|  
|-----|----|-------|  
|Name|string|null: false|
|Email|string|null: false|
|Password|string|null: false|

### Association
- has_many :posts
- has_many :groups, through: :groups_users


## groupsテーブル
|Colum|Type|Options|  
|-----|----|-------|  
|group_name|string|null: false|

### Association
- has_many : posts
- has_many : users, through: :groups_users

## groups_usersテーブル

|Colum|Type|Options|  
|-----|----|-------|  
|user_id|integer|null: false, foregin_key: true|  
|group_id|integer|null: false, foregin_key: true|  

### Association
- belongs_to :group
- belongs_to :user
