<div align="center">

# 🔗 SocialTools

**Social Media QR Code Generator & Landing Page Builder**

*Erstelle in Sekunden QR-Codes für deine Social-Media-Profile und baue deine persönliche Link-Landing-Page – ganz ohne Installation.*

[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-blue.svg)](LICENSE)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)

</div>

---

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Features](#-features)
- [Unterstützte Plattformen](#-unterstützte-plattformen)
- [Technologien](#-technologien)
- [Erste Schritte](#-erste-schritte)
- [Verwendung](#-verwendung)
  - [QR Code Generator](#qr-code-generator)
  - [Landing Page Builder](#landing-page-builder)
- [Projektstruktur](#-projektstruktur)
- [Mitwirken](#-mitwirken)
- [Lizenz](#-lizenz)

---

## 📖 Über das Projekt

**SocialTools** ist ein komplett clientseitiges Web-Tool, das aus zwei Hauptwerkzeugen besteht:

1. **QR Code Generator** – Wähle eine Social-Media-Plattform, gib deinen Benutzernamen ein und erhalte sofort einen herunterladbaren QR-Code, der direkt zu deinem Profil führt.
2. **Landing Page Builder** – Erstelle eine persönliche „Link in Bio"-Seite (ähnlich wie Linktree) mit eigenem Avatar, Profilbeschreibung, beliebig vielen Links und individuell wählbarem Design. Die fertige Seite lässt sich als teilbare URL teilen, als HTML exportieren oder direkt via WhatsApp, Telegram, X/Twitter oder E-Mail versenden.

Kein Server, kein Login, kein Backend nötig – alles läuft direkt im Browser.

---

## ✨ Features

### 📲 QR Code Generator

| Feature | Details |
|---|---|
| **12 Plattformen** | Instagram, Facebook, X/Twitter, TikTok, YouTube, LinkedIn, Pinterest, Snapchat, WhatsApp, Telegram, GitHub, Eigene URL |
| **QR-Größen** | 128 px · 200 px · 300 px · 400 px |
| **Fehlerkorrektur** | L (7 %) · M (15 %) · Q (25 %) · H (30 %) |
| **Aktionen** | Als PNG herunterladen · URL in Zwischenablage kopieren |
| **Live-Feedback** | Toast-Benachrichtigungen bei Erfolg oder Fehler |

### 🏗️ Landing Page Builder

| Feature | Details |
|---|---|
| **Profil-Editor** | Name / Brand, Bio (max. 160 Zeichen), Kategorie-Badge, Profilbild-URL, Verifiziert-Badge |
| **Links** | Unbegrenzte Links hinzufügen, bearbeiten & löschen (mit Plattform-Icon) |
| **8 Themes** | Dark · Ocean · Forest · Sunset · Purple · Rose · Mint · Light |
| **4 Button-Stile** | Rounded · Pill · Sharp · Outline |
| **3 Avatar-Formen** | Kreis · Quadrat · Hexagon |
| **Akzentfarbe** | Frei wählbare Button-Farbe per Color-Picker |
| **Animationen** | Ein-/ausschaltbare Einblende-Animationen |
| **Gerätevorschau** | Mobile · Tablet · Desktop |
| **URL-Sharing** | Seite als einzigartige, teilbare URL (Base64-kodiert, kein Upload nötig) |
| **QR-Code** | QR für die Share-URL generieren & herunterladen (S / M / L) |
| **Soziales Teilen** | WhatsApp · Telegram · X/Twitter · E-Mail · nativer System-Dialog (Mobile) |
| **HTML-Export** | Fertige Seite als eigenständige HTML-Datei herunterladen |

---

## 🌐 Unterstützte Plattformen

| Plattform | QR Generator | Landing Page Builder |
|---|:---:|:---:|
| Instagram | ✅ | ✅ |
| Facebook | ✅ | ✅ |
| X / Twitter | ✅ | ✅ |
| TikTok | ✅ | ✅ |
| YouTube | ✅ | ✅ |
| LinkedIn | ✅ | ✅ |
| Pinterest | ✅ | ✅ |
| Snapchat | ✅ | ✅ |
| WhatsApp | ✅ | ✅ |
| Telegram | ✅ | ✅ |
| GitHub | ✅ | ✅ |
| Spotify | ❌ | ✅ |
| Twitch | ❌ | ✅ |
| Discord | ❌ | ✅ |
| Website (eigene URL) | ✅ | ✅ |
| E-Mail | ❌ | ✅ |

---

## 🛠️ Technologien

| Technologie | Zweck |
|---|---|
| **HTML5** | Seitenstruktur |
| **CSS3** | Styling, Animationen, responsives Design |
| **Vanilla JavaScript** | Gesamte App-Logik (kein Framework) |
| **[QRCode.js](https://github.com/soldair/node-qrcode)** | QR-Code-Generierung via Canvas-API |
| **[Font Awesome 6.5](https://fontawesome.com/)** | Plattform- und UI-Icons |
| **[ui-avatars.com](https://ui-avatars.com/)** | Automatisch generierte Avatare als Fallback |

> Alle externen Bibliotheken werden über CDN eingebunden – keine lokale Installation erforderlich.

---

## 🚀 Erste Schritte

Da SocialTools ein rein statisches Projekt ist, sind keine Installation oder Serverkonfiguration nötig.

### Option 1 – Direkt im Browser öffnen

1. Repository klonen oder als ZIP herunterladen:
   ```bash
   git clone https://github.com/hcscmedia/socialtools.git
   cd socialtools
   ```
2. `index.html` in einem modernen Browser öffnen (Chrome, Firefox, Edge, Safari).

### Option 2 – Live-Server (empfohlen für Entwicklung)

Mit [VS Code](https://code.visualstudio.com/) und der Erweiterung [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer):

1. Projekt in VS Code öffnen.
2. Rechtsklick auf `index.html` → **„Open with Live Server"**.

Alternativ mit Node.js:
```bash
npx serve .
```

> **Internetverbindung erforderlich**, da QRCode.js und Font Awesome über CDN geladen werden.

---

## 📖 Verwendung

### QR Code Generator

1. **Plattform wählen** – Klicke auf den gewünschten Plattform-Button (z. B. Instagram). Der Button leuchtet in der jeweiligen Plattformfarbe auf.
2. **Benutzernamen eingeben** – Tippe deinen Benutzernamen in das Eingabefeld. Für die Option „Eigene URL" gibst du die vollständige URL ein.
3. **Optionen anpassen** (optional):
   - *Größe*: 128 px / 200 px / 300 px / 400 px
   - *Fehlerkorrektur*: L / M / Q / H
4. **QR Code generieren** – Klicke auf den Button oder drücke `Enter`.
5. **Ergebnis verwenden**:
   - **PNG herunterladen** – Speichert den QR-Code als Bilddatei.
   - **URL kopieren** – Kopiert die generierte Profiladresse in die Zwischenablage.

---

### Landing Page Builder

#### 1. Profil einrichten (Tab „Profil")
- Profilbild-URL eingeben (oder leer lassen für einen automatisch generierten Avatar).
- Name/Brand, Bio (max. 160 Zeichen) und Kategorie-Badge eintragen.
- Optional das Verifiziert-Badge aktivieren.

#### 2. Links hinzufügen (Tab „Links")
- Auf **„+ Link hinzufügen"** klicken → ein Modal öffnet sich.
- Plattform auswählen, Button-Label und URL eingeben, dann bestätigen.
- Bestehende Links lassen sich jederzeit bearbeiten ✏️ oder löschen 🗑️.

#### 3. Design anpassen (Tab „Design")
- **Theme** wählen: Dark, Ocean, Forest, Sunset, Purple, Rose, Mint oder Light.
- **Button-Stil** wählen: Rounded, Pill, Sharp oder Outline.
- **Akzentfarbe** per Color-Picker festlegen.
- **Avatar-Form** wählen: Kreis, Quadrat oder Hexagon.
- **Animationen** ein- oder ausschalten.

#### 4. Seite teilen (Tab „Teilen")
- Auf **„URL generieren"** klicken – es wird eine einzigartige URL erzeugt, die alle Einstellungen enthält.
- URL kopieren, im Browser öffnen, als QR-Code herunterladen oder direkt über WhatsApp, Telegram, X/Twitter, E-Mail oder den nativen System-Dialog (Mobile) teilen.

#### 5. HTML exportieren (Tab „Export")
- Auf **„HTML herunterladen"** klicken, um eine vollständig eigenständige HTML-Datei zu erhalten.

#### Live-Vorschau
Die Vorschau in der Mitte aktualisiert sich in Echtzeit. Über die Gerätesymbole oben rechts kann zwischen **Mobile**, **Tablet** und **Desktop**-Ansicht gewechselt werden.

---

## 📁 Projektstruktur

```
socialtools/
├── index.html           # QR Code Generator (Hauptseite)
├── app.js               # Logik für den QR Code Generator
├── style.css            # Gemeinsame Styles (Navigation, Layout, Basis)
├── landing-builder.html # Landing Page Builder (Editor + Live-Vorschau)
├── landing-app.js       # Logik für den Landing Page Builder
├── landing-style.css    # Styles speziell für den Builder
└── landing-view.html    # Öffentliche Ansicht einer erstellten Landing Page
```

---

## 🤝 Mitwirken

Beiträge sind herzlich willkommen! So gehst du vor:

1. Repository forken.
2. Feature-Branch erstellen:
   ```bash
   git checkout -b feature/meine-neue-funktion
   ```
3. Änderungen committen:
   ```bash
   git commit -m "feat: meine neue Funktion hinzugefügt"
   ```
4. Branch pushen:
   ```bash
   git push origin feature/meine-neue-funktion
   ```
5. Pull Request öffnen.

Bitte halte dich an den bestehenden Code-Stil (Vanilla JS, keine externen Frameworks).

---

## 📄 Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

<div align="center">
Made with ❤️ | SocialTools © 2026
</div>
