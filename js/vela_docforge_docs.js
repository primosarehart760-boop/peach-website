/* =========================================================
 * VELA DocForge 60 文档 × 5 类资源 JSON（桃子注入）
 * =========================================================
 * 来源：/Users/a1/Documents/夏夏/AI产品经理文档库_V4.0_大厂优化版/index.html
 * 抽取日期：2026-04-23
 * 用途：桃子 methodology.html 卡片 7 栏展示（VELA 5 + 桃子 5 段 + 3 法合规）
 * 铁律：不改 DocForge 原站 · 这里是只读副本 · 同步更新由首席方法论官负责
 * ========================================================= */

const DOCS = [
  // === P1 市场洞察与立项 ===
  {
    name:'01_市场数据报告', phase:1, highlight:false,
    tplFile:'模板/01_市场数据报告.md',
    support:[
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'},
      {name:'政策法规清单', url:'支撑文档模板/S02_政策法规清单模板.md'},
      {name:'TAM/SAM/SOM测算表', url:'支撑文档模板/S03_TAM_SAM_SOM测算表模板.md'},
      {name:'财务模型表', url:'支撑文档模板/S04_财务模型表模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'Statista', url:'https://www.statista.com'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'前瞻产业研究院', url:'https://www.qianzhan.com'},
      {name:'易观分析', url:'https://www.analysys.cn'},
      {name:'中商产业研究院', url:'https://www.askci.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'八爪鱼', url:'https://www.bazhuayu.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'石墨文档', url:'https://shimo.im'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'XMind', url:'https://xmind.app'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'WPS', url:'https://www.wps.cn'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'02_竞品深度体验报告', phase:1, highlight:true,
    tplFile:'模板/02_竞品深度体验报告.md',
    support:[
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'},
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'},
      {name:'TAM/SAM/SOM测算表', url:'支撑文档模板/S03_TAM_SAM_SOM测算表模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'Statista', url:'https://www.statista.com'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'前瞻产业研究院', url:'https://www.qianzhan.com'},
      {name:'易观分析', url:'https://www.analysys.cn'},
      {name:'中商产业研究院', url:'https://www.askci.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'八爪鱼', url:'https://www.bazhuayu.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'石墨文档', url:'https://shimo.im'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'XMind', url:'https://xmind.app'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'WPS', url:'https://www.wps.cn'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Claude', url:'https://claude.ai', tier:3}
    ]
  },
  {
    name:'05_SWOT分析报告', phase:1, highlight:false,
    tplFile:'模板/05_SWOT分析报告.md',
    support:[
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'},
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'},
      {name:'TAM/SAM/SOM测算表', url:'支撑文档模板/S03_TAM_SAM_SOM测算表模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'Statista', url:'https://www.statista.com'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'前瞻产业研究院', url:'https://www.qianzhan.com'},
      {name:'易观分析', url:'https://www.analysys.cn'},
      {name:'中商产业研究院', url:'https://www.askci.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'Miro', url:'https://miro.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'XMind', url:'https://xmind.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'WPS', url:'https://www.wps.cn'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Claude', url:'https://claude.ai', tier:3}
    ]
  },
  {
    name:'37_MRD市场需求汇总', phase:1, highlight:false,
    tplFile:'模板/37_MRD市场需求汇总.md',
    support:[
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'},
      {name:'政策法规清单', url:'支撑文档模板/S02_政策法规清单模板.md'},
      {name:'TAM/SAM/SOM测算表', url:'支撑文档模板/S03_TAM_SAM_SOM测算表模板.md'},
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'Statista', url:'https://www.statista.com'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'前瞻产业研究院', url:'https://www.qianzhan.com'},
      {name:'易观分析', url:'https://www.analysys.cn'},
      {name:'中商产业研究院', url:'https://www.askci.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'WPS', url:'https://www.wps.cn'},
      {name:'Miro', url:'https://miro.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'Gamma', url:'https://gamma.app'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  },
  {
    name:'36_BRD商业需求文档', phase:1, highlight:false,
    tplFile:'模板/36_BRD商业需求文档.md',
    support:[
      {name:'财务模型表', url:'支撑文档模板/S04_财务模型表模板.md'},
      {name:'ROI测算表', url:'支撑文档模板/S05_ROI测算表模板.md'},
      {name:'TAM/SAM/SOM测算表', url:'支撑文档模板/S03_TAM_SAM_SOM测算表模板.md'},
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'WPS', url:'https://www.wps.cn'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'ProcessOn', url:'https://www.processon.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'03_商业计划书BP', phase:1, highlight:false,
    tplFile:'模板/03_商业计划书BP.md',
    support:[
      {name:'财务模型表', url:'支撑文档模板/S04_财务模型表模板.md'},
      {name:'ROI测算表', url:'支撑文档模板/S05_ROI测算表模板.md'},
      {name:'TAM/SAM/SOM测算表', url:'支撑文档模板/S03_TAM_SAM_SOM测算表模板.md'},
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'Statista', url:'https://www.statista.com'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'前瞻产业研究院', url:'https://www.qianzhan.com'},
      {name:'易观分析', url:'https://www.analysys.cn'},
      {name:'中商产业研究院', url:'https://www.askci.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'WPS', url:'https://www.wps.cn'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'Gamma', url:'https://gamma.app'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'04_项目立项报告', phase:1, highlight:false,
    tplFile:'模板/04_项目立项报告.md',
    support:[
      {name:'ROI测算表', url:'支撑文档模板/S05_ROI测算表模板.md'},
      {name:'财务模型表', url:'支撑文档模板/S04_财务模型表模板.md'},
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'},
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'QuestMobile', url:'https://www.questmobile.com.cn'},
      {name:'Statista', url:'https://www.statista.com'},
      {name:'IDC', url:'https://www.idc.com'},
      {name:'36氪研究院', url:'https://36kr.com'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'前瞻产业研究院', url:'https://www.qianzhan.com'},
      {name:'易观分析', url:'https://www.analysys.cn'},
      {name:'中商产业研究院', url:'https://www.askci.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'WPS', url:'https://www.wps.cn'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Gamma', url:'https://gamma.app'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },

  // === P2 用户研究与洞察 ===
  {
    name:'06_用户调研报告', phase:2, highlight:true,
    tplFile:'模板/06_用户调研报告.md',
    support:[
      {name:'问卷模板', url:'支撑文档模板/S15_问卷模板.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'泳道图制作指南', url:'支撑文档模板/S16_泳道图制作指南.md'}
    ],
    sites:[
      {name:'百度指数', url:'https://index.baidu.com'},
      {name:'巨量算数', url:'https://trendinsight.oceanengine.com'},
      {name:'微信指数', url:'https://weixin.qq.com'},
      {name:'千瓜数据', url:'https://www.qian-gua.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'腾讯问卷', url:'https://wj.qq.com'},
      {name:'Nielsen Norman', url:'https://www.nngroup.com'},
      {name:'UX Planet', url:'https://uxplanet.org'},
      {name:'Mobbin', url:'https://mobbin.com'}
    ],
    tools:[
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'金数据', url:'https://jinshuju.net'},
      {name:'飞书妙记', url:'https://www.feishu.cn/product/minutes'},
      {name:'讯飞听见', url:'https://www.iflyrec.com'},
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'SPSS', url:'https://www.ibm.com/spss'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'08_问卷设计与数据报告', phase:2, highlight:false,
    tplFile:'模板/08_问卷设计与数据报告.md',
    support:[
      {name:'问卷模板', url:'支撑文档模板/S15_问卷模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'}
    ],
    sites:[
      {name:'百度指数', url:'https://index.baidu.com'},
      {name:'巨量算数', url:'https://trendinsight.oceanengine.com'},
      {name:'微信指数', url:'https://weixin.qq.com'},
      {name:'千瓜数据', url:'https://www.qian-gua.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'腾讯问卷', url:'https://wj.qq.com'},
      {name:'Nielsen Norman', url:'https://www.nngroup.com'},
      {name:'UX Planet', url:'https://uxplanet.org'},
      {name:'Mobbin', url:'https://mobbin.com'}
    ],
    tools:[
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'金数据', url:'https://jinshuju.net'},
      {name:'飞书妙记', url:'https://www.feishu.cn/product/minutes'},
      {name:'讯飞听见', url:'https://www.iflyrec.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'SPSS', url:'https://www.ibm.com/spss'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Qwen', url:'https://tongyi.aliyun.com', tier:3}
    ]
  },
  {
    name:'09_用户访谈记录与洞察报告', phase:2, highlight:false,
    tplFile:'模板/09_用户访谈记录与洞察报告.md',
    support:[
      {name:'问卷模板', url:'支撑文档模板/S15_问卷模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'},
      {name:'泳道图制作指南', url:'支撑文档模板/S16_泳道图制作指南.md'}
    ],
    sites:[
      {name:'百度指数', url:'https://index.baidu.com'},
      {name:'巨量算数', url:'https://trendinsight.oceanengine.com'},
      {name:'微信指数', url:'https://weixin.qq.com'},
      {name:'千瓜数据', url:'https://www.qian-gua.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'腾讯问卷', url:'https://wj.qq.com'},
      {name:'Nielsen Norman', url:'https://www.nngroup.com'},
      {name:'UX Planet', url:'https://uxplanet.org'},
      {name:'Mobbin', url:'https://mobbin.com'}
    ],
    tools:[
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'金数据', url:'https://jinshuju.net'},
      {name:'飞书妙记', url:'https://www.feishu.cn/product/minutes'},
      {name:'讯飞听见', url:'https://www.iflyrec.com'},
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'SPSS', url:'https://www.ibm.com/spss'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'07_用户画像文档', phase:2, highlight:false,
    tplFile:'模板/07_用户画像文档.md',
    support:[
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'问卷模板', url:'支撑文档模板/S15_问卷模板.md'}
    ],
    sites:[
      {name:'百度指数', url:'https://index.baidu.com'},
      {name:'巨量算数', url:'https://trendinsight.oceanengine.com'},
      {name:'千瓜数据', url:'https://www.qian-gua.com'},
      {name:'Nielsen Norman', url:'https://www.nngroup.com'},
      {name:'UX Planet', url:'https://uxplanet.org'},
      {name:'Mobbin', url:'https://mobbin.com'}
    ],
    tools:[
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'豆包', url:'https://www.doubao.com', tier:3}
    ]
  },
  {
    name:'10_用户旅程地图', phase:2, highlight:false,
    tplFile:'模板/10_用户旅程地图.md',
    support:[
      {name:'泳道图制作指南', url:'支撑文档模板/S16_泳道图制作指南.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'}
    ],
    sites:[
      {name:'百度指数', url:'https://index.baidu.com'},
      {name:'巨量算数', url:'https://trendinsight.oceanengine.com'},
      {name:'微信指数', url:'https://weixin.qq.com'},
      {name:'千瓜数据', url:'https://www.qian-gua.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'腾讯问卷', url:'https://wj.qq.com'},
      {name:'Nielsen Norman', url:'https://www.nngroup.com'},
      {name:'UX Planet', url:'https://uxplanet.org'},
      {name:'Mobbin', url:'https://mobbin.com'}
    ],
    tools:[
      {name:'问卷星', url:'https://www.wjx.cn'},
      {name:'金数据', url:'https://jinshuju.net'},
      {name:'飞书妙记', url:'https://www.feishu.cn/product/minutes'},
      {name:'讯飞听见', url:'https://www.iflyrec.com'},
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Miro', url:'https://miro.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'SPSS', url:'https://www.ibm.com/spss'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },

  // === P3 产品规划与设计 ===
  {
    name:'11_PRD产品需求文档', phase:3, highlight:true,
    tplFile:'模板/11_PRD产品需求文档.md',
    support:[
      {name:'RICE评分表', url:'支撑文档模板/S07_RICE评分表模板.md'},
      {name:'KANO分析表', url:'支撑文档模板/S08_KANO分析表模板.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'},
      {name:'埋点验收清单', url:'支撑文档模板/S10_埋点验收清单模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'PMTalk', url:'https://www.pmtalk.net'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'虎嗅', url:'https://www.huxiu.com'},
      {name:'Axure原型库', url:'https://axhub.im'},
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'产品壹佰', url:'https://www.chanpin100.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Airtable', url:'https://airtable.com'},
      {name:'Linear', url:'https://linear.app'},
      {name:'ProductPlan', url:'https://www.productplan.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'38_MVP最小可行方案', phase:3, highlight:false,
    tplFile:'模板/38_MVP最小可行方案.md',
    support:[
      {name:'RICE评分表', url:'支撑文档模板/S07_RICE评分表模板.md'},
      {name:'KANO分析表', url:'支撑文档模板/S08_KANO分析表模板.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'Linear', url:'https://linear.app'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'12_产品路线图Roadmap', phase:3, highlight:false,
    tplFile:'模板/12_产品路线图Roadmap.md',
    support:[
      {name:'RICE评分表', url:'支撑文档模板/S07_RICE评分表模板.md'},
      {name:'KANO分析表', url:'支撑文档模板/S08_KANO分析表模板.md'},
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'PMTalk', url:'https://www.pmtalk.net'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'虎嗅', url:'https://www.huxiu.com'},
      {name:'Axure原型库', url:'https://axhub.im'},
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'产品壹佰', url:'https://www.chanpin100.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Airtable', url:'https://airtable.com'},
      {name:'Linear', url:'https://linear.app'},
      {name:'ProductPlan', url:'https://www.productplan.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'13_功能清单FeatureList', phase:3, highlight:false,
    tplFile:'模板/13_功能清单FeatureList.md',
    support:[
      {name:'RICE评分表', url:'支撑文档模板/S07_RICE评分表模板.md'},
      {name:'KANO分析表', url:'支撑文档模板/S08_KANO分析表模板.md'},
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'PMTalk', url:'https://www.pmtalk.net'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'虎嗅', url:'https://www.huxiu.com'},
      {name:'Axure原型库', url:'https://axhub.im'},
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'产品壹佰', url:'https://www.chanpin100.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Airtable', url:'https://airtable.com'},
      {name:'Linear', url:'https://linear.app'},
      {name:'ProductPlan', url:'https://www.productplan.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Qwen', url:'https://tongyi.aliyun.com', tier:3}
    ]
  },
  {
    name:'14_信息架构图IA', phase:3, highlight:false,
    tplFile:'模板/14_信息架构图IA.md',
    support:[
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'},
      {name:'RICE评分表', url:'支撑文档模板/S07_RICE评分表模板.md'},
      {name:'用户标签体系', url:'支撑文档模板/S09_用户标签体系模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'PMTalk', url:'https://www.pmtalk.net'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'虎嗅', url:'https://www.huxiu.com'},
      {name:'Axure原型库', url:'https://axhub.im'},
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'产品壹佰', url:'https://www.chanpin100.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Airtable', url:'https://airtable.com'},
      {name:'Linear', url:'https://linear.app'},
      {name:'ProductPlan', url:'https://www.productplan.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'15_业务流程图', phase:3, highlight:false,
    tplFile:'模板/15_业务流程图.md',
    support:[
      {name:'泳道图制作指南', url:'支撑文档模板/S16_泳道图制作指南.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'},
      {name:'RICE评分表', url:'支撑文档模板/S07_RICE评分表模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'PMTalk', url:'https://www.pmtalk.net'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'虎嗅', url:'https://www.huxiu.com'},
      {name:'Axure原型库', url:'https://axhub.im'},
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'产品壹佰', url:'https://www.chanpin100.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Airtable', url:'https://airtable.com'},
      {name:'Linear', url:'https://linear.app'},
      {name:'ProductPlan', url:'https://www.productplan.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'16_数据指标体系文档', phase:3, highlight:false,
    tplFile:'模板/16_数据指标体系文档.md',
    support:[
      {name:'埋点验收清单', url:'支撑文档模板/S10_埋点验收清单模板.md'},
      {name:'数据看板制作指南', url:'支撑文档模板/S18_数据看板制作指南.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'AB实验报告模板', url:'支撑文档模板/S21_AB实验报告模板.md'}
    ],
    sites:[
      {name:'人人都是产品经理', url:'https://www.woshipm.com'},
      {name:'PMTalk', url:'https://www.pmtalk.net'},
      {name:'ProductHunt', url:'https://www.producthunt.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'虎嗅', url:'https://www.huxiu.com'},
      {name:'Axure原型库', url:'https://axhub.im'},
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'产品壹佰', url:'https://www.chanpin100.com'},
      {name:'Medium', url:'https://medium.com'},
      {name:'Mind the Product', url:'https://www.mindtheproduct.com'}
    ],
    tools:[
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Airtable', url:'https://airtable.com'},
      {name:'Linear', url:'https://linear.app'},
      {name:'ProductPlan', url:'https://www.productplan.com'},
      {name:'ProcessOn', url:'https://www.processon.com'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Whimsical', url:'https://whimsical.com'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Qwen', url:'https://tongyi.aliyun.com', tier:3}
    ]
  },

  // === P4 设计与体验 ===
  {
    name:'17_交互原型文档', phase:4, highlight:false,
    tplFile:'模板/17_交互原型文档.md',
    support:[
      {name:'截图录屏制作规范', url:'支撑文档模板/S26_截图录屏制作规范.md'},
      {name:'泳道图制作指南', url:'支撑文档模板/S16_泳道图制作指南.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'}
    ],
    sites:[
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'Dribbble', url:'https://dribbble.com'},
      {name:'Behance', url:'https://www.behance.net'},
      {name:'Apple HIG', url:'https://developer.apple.com/design/human-interface-guidelines/'},
      {name:'Material Design 3', url:'https://m3.material.io'},
      {name:'Ant Design', url:'https://ant-design.antgroup.com'},
      {name:'Screenlane', url:'https://screenlane.com'},
      {name:'Collect UI', url:'https://collectui.com'},
      {name:'UI8', url:'https://ui8.net'},
      {name:'Figma Community', url:'https://www.figma.com/community'}
    ],
    tools:[
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Sketch', url:'https://www.sketch.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'蓝湖', url:'https://lanhuapp.com'},
      {name:'Zeplin', url:'https://zeplin.io'},
      {name:'IconPark', url:'https://iconpark.oceanengine.com'},
      {name:'Principle', url:'https://principleformac.com'},
      {name:'ProtoPie', url:'https://www.protopie.io'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'豆包', url:'https://www.doubao.com', tier:3}
    ]
  },
  {
    name:'18_UI设计规范DesignSystem', phase:4, highlight:false,
    tplFile:'模板/18_UI设计规范DesignSystem.md',
    support:[
      {name:'截图录屏制作规范', url:'支撑文档模板/S26_截图录屏制作规范.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'},
      {name:'泳道图制作指南', url:'支撑文档模板/S16_泳道图制作指南.md'}
    ],
    sites:[
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'Dribbble', url:'https://dribbble.com'},
      {name:'Behance', url:'https://www.behance.net'},
      {name:'Apple HIG', url:'https://developer.apple.com/design/human-interface-guidelines/'},
      {name:'Material Design 3', url:'https://m3.material.io'},
      {name:'Ant Design', url:'https://ant-design.antgroup.com'},
      {name:'Screenlane', url:'https://screenlane.com'},
      {name:'Collect UI', url:'https://collectui.com'},
      {name:'UI8', url:'https://ui8.net'},
      {name:'Figma Community', url:'https://www.figma.com/community'}
    ],
    tools:[
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Sketch', url:'https://www.sketch.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'蓝湖', url:'https://lanhuapp.com'},
      {name:'Zeplin', url:'https://zeplin.io'},
      {name:'IconPark', url:'https://iconpark.oceanengine.com'},
      {name:'Principle', url:'https://principleformac.com'},
      {name:'ProtoPie', url:'https://www.protopie.io'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'19_设计走查清单', phase:4, highlight:false,
    tplFile:'模板/19_设计走查清单.md',
    support:[
      {name:'截图录屏制作规范', url:'支撑文档模板/S26_截图录屏制作规范.md'},
      {name:'Bug跟踪表', url:'支撑文档模板/S20_Bug跟踪表模板.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'}
    ],
    sites:[
      {name:'Mobbin', url:'https://mobbin.com'},
      {name:'Dribbble', url:'https://dribbble.com'},
      {name:'Behance', url:'https://www.behance.net'},
      {name:'Apple HIG', url:'https://developer.apple.com/design/human-interface-guidelines/'},
      {name:'Material Design 3', url:'https://m3.material.io'},
      {name:'Ant Design', url:'https://ant-design.antgroup.com'},
      {name:'Screenlane', url:'https://screenlane.com'},
      {name:'Collect UI', url:'https://collectui.com'},
      {name:'UI8', url:'https://ui8.net'},
      {name:'Figma Community', url:'https://www.figma.com/community'}
    ],
    tools:[
      {name:'Figma', url:'https://www.figma.com'},
      {name:'Sketch', url:'https://www.sketch.com'},
      {name:'即时设计', url:'https://js.design'},
      {name:'墨刀', url:'https://modao.cc'},
      {name:'Axure', url:'https://www.axure.com'},
      {name:'蓝湖', url:'https://lanhuapp.com'},
      {name:'Zeplin', url:'https://zeplin.io'},
      {name:'IconPark', url:'https://iconpark.oceanengine.com'},
      {name:'Principle', url:'https://principleformac.com'},
      {name:'ProtoPie', url:'https://www.protopie.io'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },

  // === P5 技术开发与测试 ===
  {
    name:'20_技术报告', phase:5, highlight:true,
    tplFile:'模板/20_技术报告.md',
    support:[
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'},
      {name:'性能测试报告模板', url:'支撑文档模板/S19_性能测试报告模板.md'},
      {name:'Bug跟踪表', url:'支撑文档模板/S20_Bug跟踪表模板.md'},
      {name:'AB实验报告模板', url:'支撑文档模板/S21_AB实验报告模板.md'}
    ],
    sites:[
      {name:'掘金', url:'https://juejin.cn'},
      {name:'InfoQ', url:'https://www.infoq.cn'},
      {name:'GitHub Trending', url:'https://github.com/trending'},
      {name:'Hugging Face', url:'https://huggingface.co'},
      {name:'LMSYS Arena', url:'https://lmarena.ai'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'Swagger', url:'https://swagger.io/specification/'},
      {name:'神策学院', url:'https://school.sensorsdata.cn'},
      {name:'禅道知识库', url:'https://www.zentao.net/book/'},
      {name:'Stack Overflow', url:'https://stackoverflow.com'}
    ],
    tools:[
      {name:'GitHub', url:'https://github.com'},
      {name:'Apifox', url:'https://apifox.com'},
      {name:'Postman', url:'https://www.postman.com'},
      {name:'Swagger', url:'https://swagger.io'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Navicat', url:'https://www.navicat.com'},
      {name:'dbdiagram.io', url:'https://dbdiagram.io'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'DBeaver', url:'https://dbeaver.io'},
      {name:'LangChain', url:'https://www.langchain.com'},
      {name:'Dify', url:'https://dify.ai'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'21_模型选型评估报告', phase:5, highlight:false,
    tplFile:'模板/21_模型选型评估报告.md',
    support:[
      {name:'AB实验报告模板', url:'支撑文档模板/S21_AB实验报告模板.md'},
      {name:'性能测试报告模板', url:'支撑文档模板/S19_性能测试报告模板.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'}
    ],
    sites:[
      {name:'掘金', url:'https://juejin.cn'},
      {name:'InfoQ', url:'https://www.infoq.cn'},
      {name:'GitHub Trending', url:'https://github.com/trending'},
      {name:'Hugging Face', url:'https://huggingface.co'},
      {name:'LMSYS Arena', url:'https://lmarena.ai'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'Swagger', url:'https://swagger.io/specification/'},
      {name:'神策学院', url:'https://school.sensorsdata.cn'},
      {name:'禅道知识库', url:'https://www.zentao.net/book/'},
      {name:'Stack Overflow', url:'https://stackoverflow.com'}
    ],
    tools:[
      {name:'GitHub', url:'https://github.com'},
      {name:'Apifox', url:'https://apifox.com'},
      {name:'Postman', url:'https://www.postman.com'},
      {name:'Swagger', url:'https://swagger.io'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Navicat', url:'https://www.navicat.com'},
      {name:'dbdiagram.io', url:'https://dbdiagram.io'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'DBeaver', url:'https://dbeaver.io'},
      {name:'LangChain', url:'https://www.langchain.com'},
      {name:'Dify', url:'https://dify.ai'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'22_API接口文档', phase:5, highlight:false,
    tplFile:'模板/22_API接口文档.md',
    support:[
      {name:'FAQ知识库模板', url:'支撑文档模板/S22_FAQ知识库模板.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'},
      {name:'性能测试报告模板', url:'支撑文档模板/S19_性能测试报告模板.md'}
    ],
    sites:[
      {name:'掘金', url:'https://juejin.cn'},
      {name:'InfoQ', url:'https://www.infoq.cn'},
      {name:'GitHub Trending', url:'https://github.com/trending'},
      {name:'Hugging Face', url:'https://huggingface.co'},
      {name:'LMSYS Arena', url:'https://lmarena.ai'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'Swagger', url:'https://swagger.io/specification/'},
      {name:'神策学院', url:'https://school.sensorsdata.cn'},
      {name:'禅道知识库', url:'https://www.zentao.net/book/'},
      {name:'Stack Overflow', url:'https://stackoverflow.com'}
    ],
    tools:[
      {name:'GitHub', url:'https://github.com'},
      {name:'Apifox', url:'https://apifox.com'},
      {name:'Postman', url:'https://www.postman.com'},
      {name:'Swagger', url:'https://swagger.io'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Navicat', url:'https://www.navicat.com'},
      {name:'dbdiagram.io', url:'https://dbdiagram.io'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'DBeaver', url:'https://dbeaver.io'},
      {name:'LangChain', url:'https://www.langchain.com'},
      {name:'Dify', url:'https://dify.ai'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'23_数据库设计文档', phase:5, highlight:false,
    tplFile:'模板/23_数据库设计文档.md',
    support:[
      {name:'FAQ知识库模板', url:'支撑文档模板/S22_FAQ知识库模板.md'},
      {name:'架构图制作指南', url:'支撑文档模板/S17_架构图制作指南.md'},
      {name:'性能测试报告模板', url:'支撑文档模板/S19_性能测试报告模板.md'}
    ],
    sites:[
      {name:'掘金', url:'https://juejin.cn'},
      {name:'InfoQ', url:'https://www.infoq.cn'},
      {name:'GitHub Trending', url:'https://github.com/trending'},
      {name:'Hugging Face', url:'https://huggingface.co'},
      {name:'LMSYS Arena', url:'https://lmarena.ai'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'Swagger', url:'https://swagger.io/specification/'},
      {name:'神策学院', url:'https://school.sensorsdata.cn'},
      {name:'禅道知识库', url:'https://www.zentao.net/book/'},
      {name:'Stack Overflow', url:'https://stackoverflow.com'}
    ],
    tools:[
      {name:'GitHub', url:'https://github.com'},
      {name:'Apifox', url:'https://apifox.com'},
      {name:'Postman', url:'https://www.postman.com'},
      {name:'Swagger', url:'https://swagger.io'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Navicat', url:'https://www.navicat.com'},
      {name:'dbdiagram.io', url:'https://dbdiagram.io'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'DBeaver', url:'https://dbeaver.io'},
      {name:'LangChain', url:'https://www.langchain.com'},
      {name:'Dify', url:'https://dify.ai'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'24_埋点需求文档', phase:5, highlight:false,
    tplFile:'模板/24_埋点需求文档.md',
    support:[
      {name:'埋点验收清单', url:'支撑文档模板/S10_埋点验收清单模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'数据看板制作指南', url:'支撑文档模板/S18_数据看板制作指南.md'}
    ],
    sites:[
      {name:'掘金', url:'https://juejin.cn'},
      {name:'InfoQ', url:'https://www.infoq.cn'},
      {name:'GitHub Trending', url:'https://github.com/trending'},
      {name:'Hugging Face', url:'https://huggingface.co'},
      {name:'LMSYS Arena', url:'https://lmarena.ai'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'Swagger', url:'https://swagger.io/specification/'},
      {name:'神策学院', url:'https://school.sensorsdata.cn'},
      {name:'禅道知识库', url:'https://www.zentao.net/book/'},
      {name:'Stack Overflow', url:'https://stackoverflow.com'}
    ],
    tools:[
      {name:'GitHub', url:'https://github.com'},
      {name:'Apifox', url:'https://apifox.com'},
      {name:'Postman', url:'https://www.postman.com'},
      {name:'Swagger', url:'https://swagger.io'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Navicat', url:'https://www.navicat.com'},
      {name:'dbdiagram.io', url:'https://dbdiagram.io'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'DBeaver', url:'https://dbeaver.io'},
      {name:'LangChain', url:'https://www.langchain.com'},
      {name:'Dify', url:'https://dify.ai'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Qwen', url:'https://tongyi.aliyun.com', tier:3}
    ]
  },
  {
    name:'25_测试用例文档', phase:5, highlight:false,
    tplFile:'模板/25_测试用例文档.md',
    support:[
      {name:'Bug跟踪表', url:'支撑文档模板/S20_Bug跟踪表模板.md'},
      {name:'性能测试报告模板', url:'支撑文档模板/S19_性能测试报告模板.md'},
      {name:'AB实验报告模板', url:'支撑文档模板/S21_AB实验报告模板.md'}
    ],
    sites:[
      {name:'掘金', url:'https://juejin.cn'},
      {name:'InfoQ', url:'https://www.infoq.cn'},
      {name:'GitHub Trending', url:'https://github.com/trending'},
      {name:'Hugging Face', url:'https://huggingface.co'},
      {name:'LMSYS Arena', url:'https://lmarena.ai'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'Swagger', url:'https://swagger.io/specification/'},
      {name:'神策学院', url:'https://school.sensorsdata.cn'},
      {name:'禅道知识库', url:'https://www.zentao.net/book/'},
      {name:'Stack Overflow', url:'https://stackoverflow.com'}
    ],
    tools:[
      {name:'GitHub', url:'https://github.com'},
      {name:'Apifox', url:'https://apifox.com'},
      {name:'Postman', url:'https://www.postman.com'},
      {name:'Swagger', url:'https://swagger.io'},
      {name:'draw.io', url:'https://app.diagrams.net'},
      {name:'Navicat', url:'https://www.navicat.com'},
      {name:'dbdiagram.io', url:'https://dbdiagram.io'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'DBeaver', url:'https://dbeaver.io'},
      {name:'LangChain', url:'https://www.langchain.com'},
      {name:'Dify', url:'https://dify.ai'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },

  // === P6 上线运营与迭代 ===
  {
    name:'26_产品使用手册', phase:6, highlight:true,
    tplFile:'模板/26_产品使用手册.md',
    support:[
      {name:'FAQ知识库模板', url:'支撑文档模板/S22_FAQ知识库模板.md'},
      {name:'截图录屏制作规范', url:'支撑文档模板/S26_截图录屏制作规范.md'},
      {name:'活动SOP模板', url:'支撑文档模板/S23_活动SOP模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'阿里云文档', url:'https://help.aliyun.com'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'27_上线CheckList', phase:6, highlight:false,
    tplFile:'模板/27_上线CheckList.md',
    support:[
      {name:'灰度发布计划', url:'支撑文档模板/S11_灰度发布计划模板.md'},
      {name:'应急预案', url:'支撑文档模板/S12_应急预案模板.md'},
      {name:'Bug跟踪表', url:'支撑文档模板/S20_Bug跟踪表模板.md'},
      {name:'性能测试报告模板', url:'支撑文档模板/S19_性能测试报告模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'阿里云文档', url:'https://help.aliyun.com'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'28_商业化与定价方案', phase:6, highlight:false,
    tplFile:'模板/28_商业化与定价方案.md',
    support:[
      {name:'财务模型表', url:'支撑文档模板/S04_财务模型表模板.md'},
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'},
      {name:'ROI测算表', url:'支撑文档模板/S05_ROI测算表模板.md'},
      {name:'渠道投放计划表', url:'支撑文档模板/S14_渠道投放计划表模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'阿里云文档', url:'https://help.aliyun.com'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Claude', url:'https://claude.ai', tier:3}
    ]
  },
  {
    name:'29_运营策略文档', phase:6, highlight:false,
    tplFile:'模板/29_运营策略文档.md',
    support:[
      {name:'渠道投放计划表', url:'支撑文档模板/S14_渠道投放计划表模板.md'},
      {name:'内容日历', url:'支撑文档模板/S13_内容日历模板.md'},
      {name:'活动SOP模板', url:'支撑文档模板/S23_活动SOP模板.md'},
      {name:'数据看板制作指南', url:'支撑文档模板/S18_数据看板制作指南.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'Tableau Gallery', url:'https://public.tableau.com/gallery/'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'豆包', url:'https://www.doubao.com', tier:3}
    ]
  },
  {
    name:'30_ASO应用商店材料', phase:6, highlight:false,
    tplFile:'模板/30_ASO应用商店材料.md',
    support:[
      {name:'隐私政策文本模板', url:'支撑文档模板/S24_隐私政策文本模板.md'},
      {name:'截图录屏制作规范', url:'支撑文档模板/S26_截图录屏制作规范.md'},
      {name:'用户协议文本模板', url:'支撑文档模板/S25_用户协议文本模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'阿里云文档', url:'https://help.aliyun.com'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'ASO100', url:'https://aso100.com'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'豆包', url:'https://www.doubao.com', tier:3}
    ]
  },
  {
    name:'31_项目汇报复盘材料', phase:6, highlight:false,
    tplFile:'模板/31_项目汇报复盘材料.md',
    support:[
      {name:'数据看板制作指南', url:'支撑文档模板/S18_数据看板制作指南.md'},
      {name:'AB实验报告模板', url:'支撑文档模板/S21_AB实验报告模板.md'},
      {name:'活动SOP模板', url:'支撑文档模板/S23_活动SOP模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'Tableau Gallery', url:'https://public.tableau.com/gallery/'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'32_AI合规与隐私文档', phase:5, highlight:false,
    tplFile:'模板/32_AI合规与隐私文档.md',
    support:[
      {name:'隐私政策文本模板', url:'支撑文档模板/S24_隐私政策文本模板.md'},
      {name:'用户协议文本模板', url:'支撑文档模板/S25_用户协议文本模板.md'},
      {name:'FAQ知识库模板', url:'支撑文档模板/S22_FAQ知识库模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'阿里云文档', url:'https://help.aliyun.com'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'GPT', url:'https://chat.openai.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'Kimi', url:'https://kimi.moonshot.cn', tier:3}
    ]
  },
  {
    name:'33_数据分析周报月报', phase:6, highlight:false,
    tplFile:'模板/33_数据分析周报月报.md',
    support:[
      {name:'数据看板制作指南', url:'支撑文档模板/S18_数据看板制作指南.md'},
      {name:'AB实验报告模板', url:'支撑文档模板/S21_AB实验报告模板.md'},
      {name:'数据采集方法指南', url:'支撑文档模板/S27_数据采集方法指南.md'},
      {name:'埋点验收清单', url:'支撑文档模板/S10_埋点验收清单模板.md'}
    ],
    sites:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion模板库', url:'https://www.notion.so/templates'},
      {name:'七麦数据', url:'https://www.qimai.cn'},
      {name:'蝉大师', url:'https://www.chandashi.com'},
      {name:'SensorTower', url:'https://app.sensortower.com'},
      {name:'新榜', url:'https://www.newrank.cn'},
      {name:'蝉妈妈', url:'https://www.chanmama.com'},
      {name:'飞瓜数据', url:'https://feigua.cn'},
      {name:'国家网信办', url:'https://www.cac.gov.cn'},
      {name:'Tableau Gallery', url:'https://public.tableau.com/gallery/'}
    ],
    tools:[
      {name:'GitBook', url:'https://www.gitbook.com'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Gamma', url:'https://gamma.app'},
      {name:'Canva', url:'https://www.canva.cn'},
      {name:'神策分析', url:'https://www.sensorsdata.cn'},
      {name:'Tableau', url:'https://www.tableau.com'},
      {name:'Metabase', url:'https://www.metabase.com'},
      {name:'GrowingIO', url:'https://www.growingio.com'},
      {name:'HubSpot', url:'https://www.hubspot.com'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Qwen', url:'https://tongyi.aliyun.com', tier:3}
    ]
  },

  // === P1 补充（竞品汇总 + 壁垒方向）===
  {
    name:'34_竞品汇总对比报告', phase:1, highlight:false,
    tplFile:'模板/34_竞品汇总对比报告.md',
    support:[
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'},
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'IT桔子', url:'https://www.itjuzi.com'},
      {name:'36氪', url:'https://36kr.com'},
      {name:'CB Insights', url:'https://www.cbinsights.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'Miro', url:'https://miro.com'},
      {name:'ProcessOn', url:'https://www.processon.com'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'Claude', url:'https://claude.ai', tier:3}
    ]
  },
  {
    name:'35_壁垒方向专题', phase:1, highlight:false,
    tplFile:'模板/35_壁垒方向专题.md',
    support:[
      {name:'行业白皮书摘要', url:'支撑文档模板/S01_行业白皮书摘要模板.md'},
      {name:'竞品功能对比矩阵', url:'支撑文档模板/S06_竞品功能对比矩阵模板.md'}
    ],
    sites:[
      {name:'艾瑞咨询', url:'https://www.iresearch.com.cn'},
      {name:'CB Insights', url:'https://www.cbinsights.com'},
      {name:'36氪研究院', url:'https://36kr.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Miro', url:'https://miro.com'},
      {name:'Notion', url:'https://www.notion.so'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },

  // === P5 补充（AI 评测体系）===
  {
    name:'39_AI选型需求单', phase:5, highlight:false,
    tplFile:'模板/39_AI选型需求单.md',
    support:[
      {name:'AI选型评估矩阵', url:'支撑文档模板/S24_AI选型评估矩阵模板.md'}
    ],
    sites:[
      {name:'HuggingFace', url:'https://huggingface.co'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'SuperCLUE', url:'https://www.superclueai.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'GPT', url:'https://chat.openai.com', tier:2},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:3}
    ]
  },
  {
    name:'40_AI评测标准文档', phase:5, highlight:false,
    tplFile:'模板/40_AI评测标准文档.md',
    support:[
      {name:'AI选型评估矩阵', url:'支撑文档模板/S24_AI选型评估矩阵模板.md'}
    ],
    sites:[
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'HuggingFace', url:'https://huggingface.co'},
      {name:'SuperCLUE', url:'https://www.superclueai.com'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  },
  {
    name:'41_AI评测报告模板', phase:5, highlight:false,
    tplFile:'模板/41_AI评测报告模板.md',
    support:[
      {name:'AI选型评估矩阵', url:'支撑文档模板/S24_AI选型评估矩阵模板.md'}
    ],
    sites:[
      {name:'OpenCompass', url:'https://opencompass.org.cn'},
      {name:'HuggingFace', url:'https://huggingface.co'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Notion', url:'https://www.notion.so'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  },
  {
    name:'42_GSB对比报告模板', phase:5, highlight:false,
    tplFile:'模板/42_GSB对比报告模板.md',
    support:[
      {name:'AI选型评估矩阵', url:'支撑文档模板/S24_AI选型评估矩阵模板.md'}
    ],
    sites:[
      {name:'HuggingFace', url:'https://huggingface.co'},
      {name:'OpenCompass', url:'https://opencompass.org.cn'}
    ],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  },
  {
    name:'43_BadCase库模板', phase:5, highlight:false,
    tplFile:'模板/43_BadCase库模板.md',
    support:[],
    sites:[
      {name:'HuggingFace', url:'https://huggingface.co'}
    ],
    tools:[
      {name:'飞书多维表格', url:'https://www.feishu.cn/product/base'},
      {name:'Notion', url:'https://www.notion.so'},
      {name:'飞书文档', url:'https://www.feishu.cn'}
    ],
    models:[
      {name:'Claude', url:'https://claude.ai', tier:1},
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  },

  // === P6 补充（归档 + 变更）===
  {
    name:'44_归档清单', phase:6, highlight:false,
    tplFile:'模板/44_归档清单.md',
    support:[],
    sites:[],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'Notion', url:'https://www.notion.so'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  },
  {
    name:'45_变更日志', phase:6, highlight:false,
    tplFile:'模板/45_变更日志.md',
    support:[],
    sites:[],
    tools:[
      {name:'飞书文档', url:'https://www.feishu.cn'},
      {name:'GitHub', url:'https://github.com'},
      {name:'Notion', url:'https://www.notion.so'}
    ],
    models:[
      {name:'DeepSeek', url:'https://chat.deepseek.com', tier:1},
      {name:'Claude', url:'https://claude.ai', tier:2},
      {name:'GPT', url:'https://chat.openai.com', tier:3}
    ]
  }
];

// 暴露到 window 供前端读
if (typeof window !== 'undefined') {
  window.VELA_DOCFORGE = {
    docs: DOCS,
    phases: [
      { id: 1, name: 'P1 市场洞察与立项' },
      { id: 2, name: 'P2 用户研究与洞察' },
      { id: 3, name: 'P3 产品规划与设计' },
      { id: 4, name: 'P4 设计与体验' },
      { id: 5, name: 'P5 技术开发与测试' },
      { id: 6, name: 'P6 上线运营与迭代' }
    ],
    meta: {
      source: 'VELA DocForge index.html',
      extracted: '2026-04-23',
      count: DOCS.length,
      columns: ['通用模板', '补充支撑', '数据源 10', '工具 10', '推荐模型 3-tier']
    }
  };
}
