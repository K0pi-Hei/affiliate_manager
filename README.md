# 📈 Affiliate Manager: The "Don't Crash My Computer" Edition

Welcome to the **Affiliate Manager**. This is a Node.js-based data transformer designed to take messy, inconsistent sales data from Amazon and eBay and turn it into a beautiful, unified table.

## 🧠 Why this exists
Most basic scripts are like glass—they look okay until they hit a tiny pebble (like an empty file) and shatter. This version is "hardened," meaning it’s built with **defensive programming** to handle the chaos of real-world data.

## 🛡️ Built-in Safety Features
* **The "Folder vs File" Shield**: Won't explode if you accidentally point it at a directory.
* **Empty File Grace**: If a JSON file is empty or missing, the script just shrugs it off and keeps moving.
* **Data Standardization**: 
    * Converts eBay's weird Unix timestamps into human dates.
    * Fixes "text-based" currency into actual math-friendly numbers.
    * Handles missing properties without throwing a tantrum.

## 🚀 How to Run It
1.  Make sure you have [Node.js](https://nodejs.org/) installed.
2.  Drop your data into the `mock_data` folder.
3.  Open your terminal and run:
    ```bash
    node hardone.js
    ```

## 📊 Sample Output
| (index) | source | revenue | date |
| :--- | :--- | :--- | :--- |
| 0 | 'Amazon' | 120.5 | '2024-05-01' |
| 1 | 'eBay' | 8.75 | '2024-05-01' |

## 🛠️ Tech Stack
* **Language:** JavaScript (Node.js)
* **Version Control:** Git & GitHub (because we aren't savages)
* **Patience:** 100%

---
*Created by [Flowerboy08](https://github.com/Flowerboy08) — because manual data entry is for the birds.*
