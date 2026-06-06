// Hermes Agent In-Chat Slash Commands
// 63 個在跟 hermes 對話時輸入的 /<command>
// 來源：前 session (Snapshot/hermes-commands-site) 的 COMMANDS 資料

const CHAT_CATEGORIES = {
  "session": "對話 Session",
  "gateway": "訊息 Gateway",
  "utility": "通用工具",
  "cli": "CLI 互動",
  "config": "設定",
  "tools_skills": "工具與技能",
  "info": "資訊查詢",
  "background": "背景任務",
  "agents": "代理",
  "cron": "排程",
  "curator": "技能管理",
  "kanban": "協作看板",
  "plugins": "外掛",
  "goal": "目標",
  "exit": "結束"
};

const CHAT_COMMANDS = [
  {
    "cat": "session",
    "name": "/new",
    "alias": "/reset",
    "desc": "開新對話,清空當前 context",
    "scenario": "想完全重來、切換任務、或 context 已經過於雜亂時"
  },
  {
    "cat": "session",
    "name": "/clear",
    "alias": null,
    "desc": "清除畫面並開新 session (CLI)",
    "scenario": "終端機畫面太亂、需要重新整理視窗時"
  },
  {
    "cat": "session",
    "name": "/retry",
    "alias": null,
    "desc": "重送上一則訊息",
    "scenario": "模型上一回回答不理想、想再生成一次同樣的請求時"
  },
  {
    "cat": "session",
    "name": "/undo",
    "alias": null,
    "desc": "移除最後一輪互動",
    "scenario": "剛問錯或答錯,想撤銷最近一輪對話時"
  },
  {
    "cat": "session",
    "name": "/title [name]",
    "alias": null,
    "desc": "為當前 session 命名",
    "scenario": "重要任務開頭先命名,事後方便 /resume 或搜尋"
  },
  {
    "cat": "session",
    "name": "/compress",
    "alias": null,
    "desc": "手動壓縮 context",
    "scenario": "對話變長、主動想摘要中段、釋放 token 空間時"
  },
  {
    "cat": "session",
    "name": "/resume [name]",
    "alias": null,
    "desc": "接續指定名稱的 session",
    "scenario": "跨時段繼續同一個任務"
  },
  {
    "cat": "session",
    "name": "/branch",
    "alias": "/fork",
    "desc": "從當前 session 分支出新會話",
    "scenario": "想拿同一段 context 試兩種不同做法,互不污染"
  },
  {
    "cat": "config",
    "name": "/config",
    "alias": null,
    "desc": "顯示當前設定 (CLI)",
    "scenario": "想確認模型、provider、tools 等狀態時"
  },
  {
    "cat": "config",
    "name": "/model [name]",
    "alias": null,
    "desc": "查看或切換模型",
    "scenario": "想換 Claude / GPT / 本地模型、或測試不同模型表現時"
  },
  {
    "cat": "config",
    "name": "/personality [name]",
    "alias": null,
    "desc": "切換人格設定",
    "scenario": "想要更正式 / 更口語 / 切換角色語氣時"
  },
  {
    "cat": "config",
    "name": "/reasoning [level]",
    "alias": null,
    "desc": "設定推理強度 (none|minimal|low|medium|high|xhigh)",
    "scenario": "簡單任務想省 token 用 low,複雜規劃用 high/xhigh"
  },
  {
    "cat": "config",
    "name": "/verbose",
    "alias": null,
    "desc": "循環切換詳細輸出:off → new → all",
    "scenario": "除錯、想看到工具呼叫細節時打開"
  },
  {
    "cat": "config",
    "name": "/voice [on|off|tts]",
    "alias": null,
    "desc": "切換語音模式",
    "scenario": "用語音輸入/輸出時"
  },
  {
    "cat": "config",
    "name": "/yolo",
    "alias": null,
    "desc": "切換危險指令的核准跳過",
    "scenario": "信任的批次任務、CI、自動化流程想跳過確認時"
  },
  {
    "cat": "tools_skills",
    "name": "/tools",
    "alias": null,
    "desc": "管理可用工具 (CLI 互動式)",
    "scenario": "想關掉某個 toolset (例如關閉 browser) 時"
  },
  {
    "cat": "tools_skills",
    "name": "/toolsets",
    "alias": null,
    "desc": "列出所有 toolset",
    "scenario": "快速查看目前啟用/停用哪些能力"
  },
  {
    "cat": "tools_skills",
    "name": "/skills",
    "alias": null,
    "desc": "搜尋/安裝 skills (CLI 互動式)",
    "scenario": "需要新能力時先去 hub 找現成 skill"
  },
  {
    "cat": "tools_skills",
    "name": "/skill <name>",
    "alias": null,
    "desc": "載入指定 skill 進當前 session",
    "scenario": "明確知道要用哪個 skill,先手動預載"
  },
  {
    "cat": "tools_skills",
    "name": "/reload-skills",
    "alias": null,
    "desc": "重新掃描 skills 目錄",
    "scenario": "手動新增/刪除 skill 檔案後,讓赫米斯重新認得"
  },
  {
    "cat": "tools_skills",
    "name": "/reload",
    "alias": null,
    "desc": "重新載入 .env 變數",
    "scenario": "改完 API key、想不重啟 session 直接生效時"
  },
  {
    "cat": "tools_skills",
    "name": "/reload-mcp",
    "alias": null,
    "desc": "重新載入 MCP servers",
    "scenario": "新增/修改 MCP 設定後重整連線"
  },
  {
    "cat": "gateway",
    "name": "/approve",
    "alias": null,
    "desc": "核准一筆待執行的指令 (gateway)",
    "scenario": "赫米斯在 Telegram/Discord 詢問是否執行某個指令時"
  },
  {
    "cat": "gateway",
    "name": "/deny",
    "alias": null,
    "desc": "拒絕待執行的指令",
    "scenario": "判斷該指令不該跑時"
  },
  {
    "cat": "gateway",
    "name": "/restart",
    "alias": null,
    "desc": "重啟 gateway",
    "scenario": "改完平台設定、卡住、想重整連線時"
  },
  {
    "cat": "gateway",
    "name": "/sethome",
    "alias": null,
    "desc": "把當前 channel 設為 home",
    "scenario": "在多群組環境想指定主對話窗時"
  },
  {
    "cat": "gateway",
    "name": "/platforms",
    "alias": "/gateway",
    "desc": "查看平台連線狀態",
    "scenario": "懷疑某平台斷線時先看這個"
  },
  {
    "cat": "gateway",
    "name": "/topic [sub]",
    "alias": null,
    "desc": "啟用/查看 Telegram DM topic session",
    "scenario": "想把 DM 拆成多個主題子對話時"
  },
  {
    "cat": "gateway",
    "name": "/update",
    "alias": null,
    "desc": "更新赫米斯 (gateway)",
    "scenario": "想拉新版時"
  },
  {
    "cat": "gateway",
    "name": "/footer [on|off]",
    "alias": null,
    "desc": "切換 gateway footer",
    "scenario": "訊息結尾要不要附 runtime metadata"
  },
  {
    "cat": "utility",
    "name": "/history",
    "alias": null,
    "desc": "顯示對話歷史 (CLI)",
    "scenario": "想回頭看自己問過什麼時"
  },
  {
    "cat": "utility",
    "name": "/save",
    "alias": null,
    "desc": "儲存對話到檔案",
    "scenario": "重要對話想留底、備查時"
  },
  {
    "cat": "utility",
    "name": "/copy [N]",
    "alias": null,
    "desc": "複製最後 N 個回覆到剪貼簿",
    "scenario": "要把赫米斯的回答貼到別處時"
  },
  {
    "cat": "utility",
    "name": "/paste",
    "alias": null,
    "desc": "貼上剪貼簿圖片",
    "scenario": "截圖、想把圖餵給赫米斯分析時"
  },
  {
    "cat": "utility",
    "name": "/image",
    "alias": null,
    "desc": "附加本地圖片",
    "scenario": "明確指定要分析哪張磁碟裡的圖時"
  },
  {
    "cat": "utility",
    "name": "/fast",
    "alias": null,
    "desc": "切換優先/快速處理",
    "scenario": "趕時間、要更短回應時"
  },
  {
    "cat": "utility",
    "name": "/usage",
    "alias": null,
    "desc": "Token 用量",
    "scenario": "想看本 session 燒了多少 token"
  },
  {
    "cat": "utility",
    "name": "/gquota",
    "alias": null,
    "desc": "顯示 Google Gemini Code Assist 配額 (CLI)",
    "scenario": "用 Gemini 帳號時看剩餘額度"
  },
  {
    "cat": "background",
    "name": "/background <prompt>",
    "alias": null,
    "desc": "把任務丟到背景跑",
    "scenario": "長任務(編譯、測試、爬蟲)不想卡住前台"
  },
  {
    "cat": "background",
    "name": "/queue <prompt>",
    "alias": null,
    "desc": "排隊到下一輪",
    "scenario": "赫米斯還在做事時,先把下一題丟進去"
  },
  {
    "cat": "background",
    "name": "/steer <prompt>",
    "alias": null,
    "desc": "在下一個工具呼叫後注入訊息",
    "scenario": "中途想換方向、但不中斷赫米斯時"
  },
  {
    "cat": "background",
    "name": "/stop",
    "alias": null,
    "desc": "殺掉背景行程",
    "scenario": "背景任務卡住、想強制終止"
  },
  {
    "cat": "agents",
    "name": "/agents",
    "alias": "/tasks",
    "desc": "顯示當前活躍的 subagents",
    "scenario": "確認有哪些 sub-task 在跑、有沒有卡住"
  },
  {
    "cat": "info",
    "name": "/help",
    "alias": null,
    "desc": "顯示所有指令",
    "scenario": "忘記指令、第一次摸赫米斯時"
  },
  {
    "cat": "info",
    "name": "/commands [page]",
    "alias": null,
    "desc": "分頁瀏覽指令 (gateway)",
    "scenario": "在手機端/小型視窗分頁看指令"
  },
  {
    "cat": "info",
    "name": "/insights [days]",
    "alias": null,
    "desc": "用量分析",
    "scenario": "想看過去 N 天的使用統計"
  },
  {
    "cat": "info",
    "name": "/status",
    "alias": null,
    "desc": "Session 資訊 (gateway)",
    "scenario": "在 IM 平台想確認目前 session 狀態"
  },
  {
    "cat": "info",
    "name": "/profile",
    "alias": null,
    "desc": "當前 profile 資訊",
    "scenario": "不確定自己在哪個 profile 下時"
  },
  {
    "cat": "info",
    "name": "/debug",
    "alias": null,
    "desc": "上傳 debug 報告",
    "scenario": "回報 bug、請社群/作者幫看時"
  },
  {
    "cat": "cron",
    "name": "/cron",
    "alias": null,
    "desc": "管理排程任務 (CLI)",
    "scenario": "想新增/暫停/列出定時任務"
  },
  {
    "cat": "curator",
    "name": "/curator [sub]",
    "alias": null,
    "desc": "背景 skill 維護 (status, run, pin, archive)",
    "scenario": "想清理閒置 skill、封存舊 skill 時"
  },
  {
    "cat": "kanban",
    "name": "/kanban [sub]",
    "alias": null,
    "desc": "多 profile 協作看板",
    "scenario": "多 agent 協作時分配任務、追蹤進度"
  },
  {
    "cat": "plugins",
    "name": "/plugins",
    "alias": null,
    "desc": "列出已安裝 plugins",
    "scenario": "確認 plugin 狀態"
  },
  {
    "cat": "goal",
    "name": "/goal [text|sub]",
    "alias": null,
    "desc": "設定跨多輪的常駐目標",
    "scenario": "有長期想推進的目標、要赫米斯主動提醒與執行"
  },
  {
    "cat": "cli",
    "name": "/snapshot [sub]",
    "alias": null,
    "desc": "建立或還原赫米斯狀態快照 (CLI)",
    "scenario": "想備份/回滾整個赫米斯 config 狀態時"
  },
  {
    "cat": "cli",
    "name": "/rollback [N]",
    "alias": null,
    "desc": "還原檔案系統 checkpoint",
    "scenario": "赫米斯改錯檔、想回到 N 步之前"
  },
  {
    "cat": "cli",
    "name": "/redraw",
    "alias": null,
    "desc": "強制重繪整個 TUI (CLI)",
    "scenario": "畫面亂掉、按其他鍵無效時"
  },
  {
    "cat": "cli",
    "name": "/busy [sub]",
    "alias": null,
    "desc": "控制赫米斯工作中按 Enter 的行為 (CLI)",
    "scenario": "想讓 Enter 變成插隊、接管或排隊下一題"
  },
  {
    "cat": "cli",
    "name": "/indicator [style]",
    "alias": null,
    "desc": "切換忙碌指示器風格",
    "scenario": "想換 kaomoji / emoji / ascii 風格"
  },
  {
    "cat": "cli",
    "name": "/skin [name]",
    "alias": null,
    "desc": "切換主題 (CLI)",
    "scenario": "想換介面配色"
  },
  {
    "cat": "cli",
    "name": "/statusbar",
    "alias": null,
    "desc": "切換狀態列 (CLI)",
    "scenario": "想要/不要底部狀態列"
  },
  {
    "cat": "cli",
    "name": "/browser",
    "alias": null,
    "desc": "開啟 CDP 瀏覽器連線",
    "scenario": "想用赫米斯控制瀏覽器(截圖、爬網頁、填表)"
  },
  {
    "cat": "exit",
    "name": "/quit",
    "alias": "/exit, /q",
    "desc": "離開 CLI",
    "scenario": "結束互動"
  }
];
