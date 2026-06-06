// Hermes Agent CLI 指令資料
// 涵蓋 80%-90% 使用情境,每個指令附說明 + 常見 subcommand
const COMMANDS = {
  "chat": {
    "desc": "啟動互動對話（最常用）",
    "subs": [
      [
        "hermes chat",
        "進入互動模式（跟模型聊天）"
      ],
      [
        "hermes chat -q \"你的問題\"",
        "單次提問（不進入互動模式，問完就退出）"
      ],
      [
        "hermes chat --image photo.png",
        "帶圖片提問（OCR、圖片分析）"
      ],
      [
        "hermes chat --resume <id>",
        "接續之前的對話 session"
      ],
      [
        "hermes chat --continue",
        "接續最近一次對話"
      ],
      [
        "hermes chat --tui",
        "用 TUI 介面（適合遠端 SSH 連進 N100 用）"
      ]
    ]
  },
  "setup": {
    "desc": "首次安裝設定精靈",
    "subs": [
      [
        "hermes setup",
        "互動式設定（第一次安裝必跑）"
      ],
      [
        "hermes setup --quick",
        "快速設定（用預設值，跳過細節）"
      ],
      [
        "hermes setup --reset",
        "重置所有設定回出廠"
      ],
      [
        "hermes setup model",
        "只設定模型 provider"
      ],
      [
        "hermes setup gateway",
        "只設定訊息 gateway（Telegram/Discord）"
      ]
    ]
  },
  "version": {
    "desc": "查看版本",
    "subs": [
      [
        "hermes version",
        "顯示當前 Hermes Agent 版本"
      ]
    ]
  },
  "status": {
    "desc": "查看系統狀態",
    "subs": [
      [
        "hermes status",
        "顯示所有元件狀態（gateway、cron、skills）"
      ],
      [
        "hermes status --all",
        "詳細狀態（含每個 cron job 最後執行時間）"
      ],
      [
        "hermes status --deep",
        "深層診斷（會跑健康檢查）"
      ]
    ]
  },
  "doctor": {
    "desc": "健康檢查 + 自動修復",
    "subs": [
      [
        "hermes doctor",
        "跑診斷（找出設定錯誤、依賴缺失）"
      ],
      [
        "hermes doctor --fix",
        "自動修復可修的問題"
      ]
    ]
  },
  "logs": {
    "desc": "看日誌（debug 用）",
    "subs": [
      [
        "hermes logs",
        "看 gateway 日誌（最後 50 行）"
      ],
      [
        "hermes logs -n 200",
        "看最後 200 行"
      ],
      [
        "hermes logs -f",
        "即時追蹤（像 tail -f）"
      ],
      [
        "hermes logs --level error",
        "只看 error 等級"
      ],
      [
        "hermes logs --session <id>",
        "看特定對話 session 的日誌"
      ],
      [
        "hermes logs --since 1h",
        "只看最近 1 小時的"
      ]
    ]
  },
  "model": {
    "desc": "選擇/切換預設模型",
    "subs": [
      [
        "hermes model",
        "互動式選預設模型"
      ],
      [
        "hermes model --refresh",
        "重新抓取可用模型清單"
      ]
    ]
  },
  "login": {
    "desc": "登入模型 provider（拿 API token）",
    "subs": [
      [
        "hermes login",
        "互動式登入（會開瀏覽器 OAuth）"
      ],
      [
        "hermes login --provider nous",
        "指定 provider（nous / openai-codex / xai-oauth）"
      ],
      [
        "hermes login --no-browser",
        "不開瀏覽器（手動貼 token 用）"
      ]
    ]
  },
  "logout": {
    "desc": "登出 provider",
    "subs": [
      [
        "hermes logout",
        "登出當前 provider"
      ],
      [
        "hermes logout --provider openai-codex",
        "登出指定 provider"
      ]
    ]
  },
  "auth": {
    "desc": "管理多個 provider 憑證（pool）",
    "subs": [
      [
        "hermes auth list",
        "列出所有已登入的 provider"
      ],
      [
        "hermes auth add",
        "新增 provider 憑證"
      ],
      [
        "hermes auth remove",
        "移除 provider 憑證"
      ],
      [
        "hermes auth status",
        "看當前生效中的 provider"
      ]
    ]
  },
  "fallback": {
    "desc": "管理備援模型鏈（主模型掛了自動切換）",
    "subs": [
      [
        "hermes fallback list",
        "看備援模型清單"
      ],
      [
        "hermes fallback add \"provider/model\"",
        "新增備援"
      ],
      [
        "hermes fallback remove \"provider/model\"",
        "移除備援"
      ]
    ]
  },
  "cron": {
    "desc": "管理排程任務（定時自動跑）",
    "subs": [
      [
        "hermes cron list",
        "列出所有 cron job"
      ],
      [
        "hermes cron create --name X --schedule \"0 9 * * *\" --prompt \"...\"",
        "新增排程"
      ],
      [
        "hermes cron edit <job_id>",
        "編輯既有排程"
      ],
      [
        "hermes cron run <job_id>",
        "立刻手動跑一次（不等到時間）"
      ],
      [
        "hermes cron pause <job_id>",
        "暫停排程"
      ],
      [
        "hermes cron resume <job_id>",
        "恢復排程"
      ],
      [
        "hermes cron remove <job_id>",
        "刪除排程"
      ]
    ]
  },
  "webhook": {
    "desc": "管理 webhook 訂閱（事件觸發 agent 啟動）",
    "subs": [
      [
        "hermes webhook list",
        "列出所有 webhook"
      ],
      [
        "hermes webhook subscribe --url <url> --event <event>",
        "新增 webhook"
      ],
      [
        "hermes webhook test <id>",
        "測試 webhook 是否能觸發"
      ],
      [
        "hermes webhook remove <id>",
        "移除 webhook"
      ]
    ]
  },
  "memory": {
    "desc": "管理外部記憶 provider（讓 agent 跨 session 記得事）",
    "subs": [
      [
        "hermes memory setup",
        "互動式設定記憶 provider"
      ],
      [
        "hermes memory status",
        "看當前記憶 provider 狀態"
      ],
      [
        "hermes memory off",
        "關閉外部記憶（用本地 MEMORY.md）"
      ]
    ]
  },
  "skills": {
    "desc": "管理技能（plugin）",
    "subs": [
      [
        "hermes skills list",
        "列出已安裝技能"
      ],
      [
        "hermes skills search <keyword>",
        "搜尋可安裝的技能"
      ],
      [
        "hermes skills install <name>",
        "安裝技能"
      ],
      [
        "hermes skills inspect <name>",
        "看技能詳細內容"
      ],
      [
        "hermes skills update <name>",
        "更新技能"
      ],
      [
        "hermes skills uninstall <name>",
        "移除技能"
      ]
    ]
  },
  "config": {
    "desc": "管理 config.yaml 設定檔",
    "subs": [
      [
        "hermes config show",
        "顯示完整設定"
      ],
      [
        "hermes config path",
        "顯示 config.yaml 路徑"
      ],
      [
        "hermes config set <key> <value>",
        "設定某個值（會自動寫入檔）"
      ],
      [
        "hermes config edit",
        "用編輯器（vim/nano）開設定檔"
      ]
    ]
  },
  "backup": {
    "desc": "備份整個 Hermes 設定",
    "subs": [
      [
        "hermes backup",
        "備份到 ~/.hermes/backups/（預設檔名含時間戳）"
      ],
      [
        "hermes backup -o my.zip",
        "備份到指定檔名"
      ],
      [
        "hermes backup -q",
        "快速備份（略過 cron log 等大檔）"
      ],
      [
        "hermes backup -l \"before-upgrade\"",
        "加標籤（方便辨識）"
      ]
    ]
  },
  "import": {
    "desc": "從備份還原",
    "subs": [
      [
        "hermes import my.zip",
        "還原指定備份檔（會覆蓋現有設定）"
      ],
      [
        "hermes import my.zip --force",
        "強制還原（跳過確認）"
      ]
    ]
  },
  "send": {
    "desc": "從 shell 腳本送訊息到已設定的 channel（Telegram/Discord）",
    "subs": [
      [
        "hermes send \"Hello\"",
        "送純文字到預設 channel"
      ],
      [
        "hermes send -t telegram \"Hello\"",
        "指定 channel"
      ],
      [
        "hermes send -f /path/to/file",
        "送檔案"
      ],
      [
        "hermes send \"Alert!\" --json",
        "用 JSON 格式送（給自動化用）"
      ]
    ]
  },
  "dashboard": {
    "desc": "啟動本地網頁監控面板",
    "subs": [
      [
        "hermes dashboard",
        "啟動監控面板（預設 port 8501，會自動開瀏覽器）"
      ],
      [
        "hermes dashboard --port 9000",
        "指定 port"
      ],
      [
        "hermes dashboard --host 0.0.0.0",
        "綁所有網卡（從別台電腦也連得到）"
      ],
      [
        "hermes dashboard --no-open",
        "不自動開瀏覽器"
      ]
    ]
  },
  "dump": {
    "desc": "輸出診斷摘要（給客服/support 用）",
    "subs": [
      [
        "hermes dump",
        "印出精簡診斷資訊（可貼 Discord/GitHub）"
      ],
      [
        "hermes dump --show-keys",
        "包含敏感 key（只用於本機 debug）"
      ]
    ]
  },
  "insights": {
    "desc": "分析 session 用量（token 成本）",
    "subs": [
      [
        "hermes insights",
        "看最近 7 天的 token 用量"
      ],
      [
        "hermes insights --days 30",
        "看最近 30 天"
      ],
      [
        "hermes insights --source cron",
        "只看 cron job 觸發的 session"
      ]
    ]
  },
  "kanban": {
    "desc": "多 profile 協作看板（任務管理）",
    "subs": [
      [
        "hermes kanban init",
        "初始化看板"
      ],
      [
        "hermes kanban boards",
        "列出所有看板"
      ],
      [
        "hermes kanban list",
        "列出當前看板的任務"
      ],
      [
        "hermes kanban create \"Task name\"",
        "新增任務"
      ],
      [
        "hermes kanban assign <id> <user>",
        "指派任務"
      ],
      [
        "hermes kanban complete <id>",
        "標記完成"
      ],
      [
        "hermes kanban stats",
        "看統計"
      ]
    ]
  },
  "portal": {
    "desc": "Nous Portal 訂閱/Tool Gateway 狀態",
    "subs": [
      [
        "hermes portal status",
        "看 Portal 訂閱狀態"
      ],
      [
        "hermes portal open",
        "開 Portal 網頁"
      ],
      [
        "hermes portal tools",
        "看 Tool Gateway 路由"
      ]
    ]
  },
  "pairing": {
    "desc": "管理使用者配對碼（誰可以連你的 agent）",
    "subs": [
      [
        "hermes pairing list",
        "列出所有待審核的配對"
      ],
      [
        "hermes pairing approve <code>",
        "核准配對"
      ],
      [
        "hermes pairing revoke <code>",
        "撤銷配對"
      ]
    ]
  },
  "security": {
    "desc": "資安掃描（OSV.dev 漏洞資料庫）",
    "subs": [
      [
        "hermes security",
        "掃描所有依賴的已知漏洞"
      ]
    ]
  },
  "curator": {
    "desc": "技能 curator（自動管理技能生命週期）",
    "subs": [
      [
        "hermes curator status",
        "看當前狀態"
      ],
      [
        "hermes curator run",
        "手動觸發一次 curator 跑"
      ],
      [
        "hermes curator pause",
        "暫停"
      ]
    ]
  },
  "bundles": {
    "desc": "技能組合包（一個 /<bundle> 載入多個技能）",
    "subs": [
      [
        "hermes bundles list",
        "列出所有 bundle"
      ],
      [
        "hermes bundles show <name>",
        "看 bundle 內容"
      ],
      [
        "hermes bundles create <name>",
        "新增 bundle"
      ]
    ]
  },
  "plugins": {
    "desc": "管理 plugins（跟 skills 類似但層級不同）",
    "subs": [
      [
        "hermes plugins list",
        "列出已安裝 plugin"
      ],
      [
        "hermes plugins install <name>",
        "安裝"
      ],
      [
        "hermes plugins enable <name>",
        "啟用"
      ],
      [
        "hermes plugins disable <name>",
        "停用"
      ]
    ]
  }
};
