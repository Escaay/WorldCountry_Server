1.user_basis
SQL语句：
CREATE TABLE user_basis (  
    id VARCHAR(255) NOT NULL PRIMARY KEY,  
    phone VARCHAR(20) NOT NULL,  
    name VARCHAR(255) NOT NULL,  
    avatarURL VARCHAR(255),  
    gender ENUM('male', 'female', 'other') NOT NULL,  
    age INT NOT NULL,  
    VX VARCHAR(255),  
    originalAddress JSON,  
    currentAddress JSON,  
    status VARCHAR(50),  
    customTags JSON,  
    height INT NOT NULL, -- 假设身高以厘米为单位存储  
    weight INT NOT NULL  -- 假设体重以千克为单位，且四舍五入到最近的整数  
);

2.user_message_list
SQL语句：
CREATE TABLE user_message_list (  
    id VARCHAR(255) NOT NULL PRIMARY KEY COMMENT '唯一标识符',  
    name VARCHAR(255) NOT NULL COMMENT '消息名称或标题',  
    isRead TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否已读，0表示未读，1表示已读',  
    isDelete TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否已删除，0表示未删除，1表示已删除',  
    content TEXT NOT NULL COMMENT '消息内容',  
    time DATETIME NOT NULL COMMENT '消息发送时间'  
    -- 如果需要添加索引或其他约束，可以在这里继续添加  
);  

3.user_login
SQL语句：
CREATE TABLE user_login (  
    phone VARCHAR(255) NOT NULL COMMENT '手机号',  
    password VARCHAR(255) NOT NULL COMMENT '密码',  
    recentLoginTime DATETIME NOT NULL COMMENT '最近登录时间',  
    registerTime DATETIME NOT NULL COMMENT '注册时间',  
    PRIMARY KEY (phone) -- 假设手机号是唯一的，用作主键  
);  