# Workshop Setup Guide / คู่มือเตรียมตัวก่อน Workshop

> **Claude Code Skills Creation Workshop — Fortal 2026**
>
> กรุณาทำตามขั้นตอนนี้ให้เสร็จ**ก่อนวัน workshop** เพื่อให้เราใช้เวลาในห้องสร้าง skills ได้เลย
> ไม่ต้องเสียเวลาติดตั้งซอฟต์แวร์

---

## สิ่งที่ต้องมี / Prerequisites

| Software | Version ขั้นต่ำ | ใช้ทำอะไร |
|----------|----------------|-----------|
| **Node.js** | v18+ | Runtime สำหรับ Claude Code CLI |
| **Claude Code CLI** | latest | AI coding assistant ที่เราจะสร้าง skills ให้ |
| **Bun** | v1.0+ | JavaScript/TypeScript runtime สำหรับ skill scripts |
| **Git** | v2.30+ | Version control (ใช้ใน demo) |
| **oracle-skills-cli** | latest | CLI สำหรับจัดการและติดตั้ง skills |
| **Code Editor** | ใดก็ได้ | VS Code, Cursor, Zed, Vim — ที่ถนัด |

### Account ที่ต้องมี

- **Anthropic API key** หรือ **Claude Pro/Max subscription** — ต้องมีเพื่อใช้ Claude Code
- **GitHub account** — สำหรับ clone repos

---

## ขั้นตอนการติดตั้ง / Installation Steps

### Step 1: ติดตั้ง Node.js

ตรวจสอบว่ามี Node.js หรือยัง:

```bash
node --version
# ต้องได้ v18 ขึ้นไป
```

ถ้ายังไม่มี:

**macOS:**
```bash
# ใช้ Homebrew
brew install node

# หรือใช้ nvm (แนะนำ)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.zshrc
nvm install --lts
```

**Linux (Ubuntu/Debian):**
```bash
# ใช้ nvm (แนะนำ)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```

**Linux (Other distros):**
```bash
# ใช้ nvm เหมือนกัน — ใช้ได้ทุก distro
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# restart terminal แล้วรัน:
nvm install --lts
```

---

### Step 2: ติดตั้ง Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

ตรวจสอบ:
```bash
claude --version
```

ตั้งค่าครั้งแรก (ถ้ายังไม่เคยใช้):
```bash
claude
# จะมี prompt ให้ login หรือใส่ API key
# ทำตามขั้นตอนบนหน้าจอ
```

> **หมายเหตุ**: ถ้าใช้ Claude Pro/Max subscription ให้ login ผ่าน browser ตามที่ CLI แนะนำ
> ถ้าใช้ API key ให้เตรียม key ไว้ก่อน

---

### Step 3: ติดตั้ง Bun

**macOS / Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**สำหรับ macOS ที่ใช้ Homebrew:**
```bash
brew install oven-sh/bun/bun
```

ตรวจสอบ:
```bash
bun --version
# ต้องได้ v1.0 ขึ้นไป
```

> **หมายเหตุ**: หลังติดตั้ง Bun อาจต้อง restart terminal หรือรัน `source ~/.zshrc` (macOS) / `source ~/.bashrc` (Linux) เพื่อให้ PATH อัพเดท

---

### Step 4: ตรวจสอบ Git

```bash
git --version
# ต้องได้ v2.30 ขึ้นไป
```

ถ้ายังไม่มี:

**macOS:**
```bash
# Git มาพร้อม Xcode Command Line Tools
xcode-select --install

# หรือใช้ Homebrew
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update && sudo apt install git
```

**Linux (Fedora):**
```bash
sudo dnf install git
```

---

### Step 5: ติดตั้ง oracle-skills-cli

```bash
npm install -g oracle-skills-cli
```

ตรวจสอบ:
```bash
oracle-skills --version
```

ดู skills ที่มี:
```bash
oracle-skills list
```

---

### Step 6: เตรียม Workshop Directory

สร้าง folder สำหรับ workshop:

```bash
mkdir -p ~/workshop-skills
cd ~/workshop-skills
git init
```

สร้างไฟล์ทดสอบ:
```bash
echo "# My Skills Workshop" > README.md
git add README.md
git commit -m "init: workshop workspace"
```

---

## ตรวจสอบทุกอย่าง / Verification Checklist

รัน commands เหล่านี้ทั้งหมด ทุกอันต้องทำงานได้:

```bash
echo "=== Checking prerequisites ==="

echo "Node.js:"
node --version

echo "Claude Code:"
claude --version

echo "Bun:"
bun --version

echo "Git:"
git --version

echo "oracle-skills:"
oracle-skills --version

echo "=== All checks passed ==="
```

### ผลลัพธ์ที่ถูกต้อง (ตัวอย่าง)

```
=== Checking prerequisites ===
Node.js:
v22.x.x
Claude Code:
1.x.x
Bun:
1.x.x
Git:
git version 2.x.x
oracle-skills:
1.x.x
=== All checks passed ===
```

ถ้าทุก command แสดง version number ได้ แสดงว่าพร้อมแล้ว!

---

## ทดสอบ Claude Code / Test Claude Code

ทดสอบว่า Claude Code ทำงานได้จริง:

```bash
cd ~/workshop-skills
claude
```

พิมพ์ใน Claude Code:
```
What files are in this directory?
```

Claude ควรตอบว่าเห็น `README.md` ถ้าทำงานได้ถูกต้อง พิมพ์ `/exit` เพื่อออก

---

## Troubleshooting / แก้ปัญหาที่พบบ่อย

### ปัญหา: `command not found: claude`

**สาเหตุ**: npm global bin directory ไม่อยู่ใน PATH

**แก้ไข:**
```bash
# ดูว่า npm global bin อยู่ที่ไหน
npm config get prefix

# เพิ่มเข้า PATH (macOS - zsh)
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# เพิ่มเข้า PATH (Linux - bash)
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

### ปัญหา: `command not found: bun`

**สาเหตุ**: Bun ไม่อยู่ใน PATH หลังติดตั้ง

**แก้ไข:**
```bash
# macOS (zsh)
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.zshrc
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Linux (bash)
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

หรือ restart terminal แล้วลองใหม่

---

### ปัญหา: Claude Code ไม่ยอม login

**สาเหตุ**: ยังไม่ได้ตั้งค่า API key หรือ subscription

**แก้ไข:**
1. ถ้าใช้ API key:
   ```bash
   export ANTHROPIC_API_KEY="sk-ant-..."
   claude
   ```
2. ถ้าใช้ Claude Pro/Max:
   - รัน `claude` แล้วเลือก login ผ่าน browser
   - ทำตาม OAuth flow บนหน้าจอ

---

### ปัญหา: `oracle-skills: command not found`

**สาเหตุ**: ติดตั้งไม่สำเร็จ หรือ PATH ไม่ถูก

**แก้ไข:**
```bash
# ลองติดตั้งใหม่
npm install -g oracle-skills-cli

# ถ้ายังไม่ได้ ลองใช้ npx
npx oracle-skills-cli --version
```

---

### ปัญหา: Permission denied ตอนติดตั้ง npm packages

**แก้ไข:**

อย่าใช้ `sudo npm install -g` — ใช้วิธีนี้แทน:

```bash
# ตั้ง npm prefix ใน home directory
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'

# เพิ่มเข้า PATH (macOS - zsh)
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# เพิ่มเข้า PATH (Linux - bash)
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# ติดตั้งใหม่
npm install -g @anthropic-ai/claude-code
npm install -g oracle-skills-cli
```

---

### ปัญหา: Git version เก่าเกินไป

**macOS:**
```bash
brew update && brew install git
```

**Linux:**
```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

---

## สิ่งที่ไม่ต้องทำ / What NOT to Do

- **อย่า** ติดตั้ง Docker — ไม่จำเป็นสำหรับ workshop นี้
- **อย่า** ใช้ `sudo` กับ npm — จะทำให้ permission มีปัญหา
- **อย่า** กังวลเรื่อง Python, Rust, Go — เราใช้แค่ TypeScript + Bun
- **อย่า** clone repo อะไรล่วงหน้า — เราจะสร้างทุกอย่างด้วยกันในห้อง

---

## ถ้าติดปัญหา / Need Help?

1. ลองค้นหา error message ใน Google ก่อน
2. ถาม Claude! — `claude "How do I fix: [error message]"`
3. ติดต่อผู้สอน (Nat) ก่อนวัน workshop

---

## Checklist สุดท้าย / Final Checklist

ก่อนมา workshop ตรวจสอบว่า:

- [ ] Node.js v18+ ติดตั้งแล้ว (`node --version`)
- [ ] Claude Code CLI ติดตั้งแล้ว (`claude --version`)
- [ ] Claude Code login ได้แล้ว (ทดสอบด้วยการรัน `claude`)
- [ ] Bun ติดตั้งแล้ว (`bun --version`)
- [ ] Git ติดตั้งแล้ว (`git --version`)
- [ ] oracle-skills-cli ติดตั้งแล้ว (`oracle-skills --version`)
- [ ] สร้าง `~/workshop-skills` directory แล้ว
- [ ] Code editor พร้อมใช้

**ถ้า checklist ทุกข้อผ่าน แสดงว่าพร้อมสำหรับ workshop แล้ว!**

> "Every skill begins as rough timber. The workshop shapes it into something that fits the hand."
> เจอกันที่ Hakone Cafe, เชียงใหม่!
