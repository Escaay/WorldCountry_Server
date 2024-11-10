export type UserBasis = {
    /**
     * 年龄
     */
    age?: string;
    /**
     * 头像URL
     */
    avatarURL?: string;
    /**
     * 现居地
     */
    currentAddress?: string[];
    /**
     * 自定义标签
     */
    customTags?: string[];
    /**
     * 筛选信息
     */
    filterInfo?: FilterInfo;
    /**
     * 性别
     */
    gender?: string;
    /**
     * 用户ID
     */
    id: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 手机号
     */
    phone?: string;
    /**
     * 当前状态
     */
    status?: string;
    /**
     * 微信号
     */
    vx?: string;
  }
  
  export type FilterInfo = {
    /**
     * 现居地
     */
    currentAddress?: string[];
    /**
     * 自定义标签
     */
    customTags?: string[];
    /**
     * 性别
     */
    gender?: string;
    /**
     * 最小年龄
     */
    maxAge?: string;
    /**
     * 最大年龄
     */
    minAge?: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 手机号
     */
    phone?: string;
    /**
     * 当前状态
     */
    status?: string;
    /**
     * 微信号
     */
    vx?: string;
  }

export type UserLogin = {
    /**
     * 六位验证码
     */
    code?: string;
    /**
     * 密码
     */
    password?: string;
    /**
     * 手机号
     */
    phone: string;
}

export type Register = {
  /**
   * 验证码
   */
  code: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 姓名
   */
  phone: string;
}

