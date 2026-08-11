<div align="center">

  <h1>Syncfusion® React Pivot Table – Flask API Server Quick Start</h1>

  <p>
    A production-ready quick start that connects the <strong>Syncfusion® React Pivot Table</strong> to a <strong>Python Flask</strong> backend using <strong>custom fetch-based binding</strong> — enabling remote data loading and full CRUD operations over REST endpoints.
  </p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19%2B-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"></a>
    <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-2.0%2B-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask"></a>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
    <a href="https://www.syncfusion.com/react-components/react-pivot-table"><img src="https://img.shields.io/badge/Syncfusion-EJ2-FF9C00?style=for-the-badge&logo=syncfusion&logoColor=white" alt="Syncfusion"></a>
    <a href="https://github.com/SyncfusionExamples/syncfusion-react-pivot-with-flask-api/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"></a>
  </p>
</div>

---

## 📑 Table of Contents

- [🚀 Quick Overview](#-quick-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Prerequisites](#-prerequisites)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#-installation--setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend – Flask API Server](#2-backend--flask-api-server)
  - [3. Frontend – React Pivot Table](#3-frontend--react-pivot-table)
- [▶️ Running the Application](#-running-the-application)
- [🧪 Testing CRUD Operations](#-testing-crud-operations)
- [🔧 Troubleshooting](#-troubleshooting)
- [📖 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📜 License & Support](#-license--support)
- [📚 Related Resources](#-related-resources)

---

## 🚀 Quick Overview

This project demonstrates how to bind the **Syncfusion® React Pivot Table** to a remote **Python Flask** backend using **custom fetch-based binding** with the drill-through editing grid. Unlike the FastAPI sample (which uses [`UrlAdaptor`](https://ej2.syncfusion.com/react/documentation/data/adaptors/url-adaptor)), this project uses a `useEffect`-based initial data load and an `actionComplete` event handler attached to the drill-through grid to dispatch `POST`, `PUT`, and `DELETE` requests to the Flask REST API. The drill-through grid is the place where all CRUD operations are performed — double-click any value cell in the Pivot Table to open it.

| Component          | Technology                         | Purpose                                              |
| ------------------ | ---------------------------------  | ---------------------------------------------------- |
| 🎨 Frontend        | React 19 + Vite + Syncfusion® EJ2  | Render the interactive Pivot Table UI                |
| ⚙️ Backend         | Python 3.11+ + Flask + Flask-CORS  | Serve data, perform CRUD, return JSON responses      |
| 🔌 Binding         | `fetch` + `useEffect` + drill-through `actionComplete` | Bridge between Pivot Table and Flask REST endpoints |
| 📊 Sample Data     | In-memory `products` list (from `products_data.json`) | Simulate product sales records for the Pivot Table |

> 💡 Flask is a lightweight Python web framework that makes it easy to build REST APIs for web applications. The backend in this project follows a simple, readable layout — one `app.py` file containing all routes (`GET`, `POST`, `PUT`, `DELETE`) and an in-memory data store loaded from `products_data.json` at startup. CRUD requests from the drill-through grid are dispatched through standard HTTP methods.

---

## ✨ Key Features

- 📊 **Remote Data Binding** – Connects the Pivot Table to a Flask REST endpoint over HTTP.
- 🔄 **Full CRUD Support** – Insert, update, and delete records directly from the Pivot Table drill-through grid.
- 🐍 **Flask API Backend** – Built with Flask and Flask-CORS for a minimal, readable REST API.
- 🗂️ **Plain JSON Response** – `GET /products` returns the product array as plain JSON. The React client assigns it directly to `dataSourceSettings.dataSource`.
- 🔑 **Primary Key Configuration** – Uses `ProductID` as the primary key for unique record identification during update and delete.
- 🌐 **CORS-Enabled** – Preconfigured with `Flask-CORS` to allow cross-origin requests from the Vite dev server.
- ⚡ **Drill-Through Editing** – Double-click a pivot cell to add, edit, or delete underlying records in a pop-up grid.
- 🛡️ **Robust Error Handling** – Routes return meaningful HTTP status codes (`201`, `404`) and clear error messages.
- 📦 **Ready-to-Run** – Clone, install, and start both projects — no database setup required (in-memory sample data).

---

## 🛠️ Prerequisites

Make sure the following software and packages are installed on your machine before running the project.

| Software / Package            | Version       | Purpose                                              |
| ----------------------------- | ------------- | ---------------------------------------------------- |
| 🐍 Python                     | 3.11 or later | Runtime for the Flask backend                        |
| 📦 venv                       | Included with Python | Creates an isolated Python environment for the backend |
| 🌶️ Flask                     | 2.0 or later  | REST API framework                                   |
| 🔀 Flask-CORS                 | 3.0 or later  | Allows requests from the React dev server            |
| 🟢 Node.js                    | 20.x LTS or later | Runtime for the React dev server                  |
| 📦 npm / yarn / pnpm          | Latest stable | Package manager                                      |
| ⚛️ React                      | 19.x or later | Build the Pivot Table client                         |
| ⚡ Vite                       | 7.3 or later  | React dev server and build tool                      |
| 📦 @syncfusion/ej2-react-pivotview | 33.1.45+ | React Pivot Table component                           |
| 📦 @syncfusion/ej2-tailwind3-theme  | Latest  | Syncfusion theme stylesheet for the Tailwind 3 theme |

---

## 📂 Project Structure

```text
syncfusion-react-pivot-with-flask-api/
├── 📁 Client/                                # React frontend (Pivot Table) — Vite + TypeScript
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── App.css                           # Component styles
│   │   ├── App.tsx                           # Pivot Table with custom fetch binding + CRUD handlers
│   │   ├── index.css
│   │   ├── main.tsx                          # React entry point
│   │   └── 📁 assets/
│   ├── index.html
│   ├── package.json                          # React dependencies & scripts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── 📁 FlaskAPIServer/                        # Python backend (Flask + Flask-CORS)
│   ├── app.py                                # Flask app: CORS, /products routes (GET/POST/PUT/DELETE)
│   └── products_data.json                    # Sample product data source (16 records)
│
├── 📄 README.md                              # You are here
└── 📄 flaskapi-server.md                     # UG documentation source for this sample
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SyncfusionExamples/syncfusion-react-pivot-with-flask-api.git
cd syncfusion-react-pivot-with-flask-api
```

### 2. Backend – Flask API Server

The backend project lives in the `FlaskAPIServer/` folder.

#### 2.1 Create and activate a virtual environment

A virtual environment keeps the Python packages used by this backend separate from other projects on your machine.

```bash
cd FlaskAPIServer
python -m venv venv

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate
```

#### 2.2 Install the Python dependencies

```bash
pip install flask flask-cors
```

**Package descriptions:**

- **flask** – Creates the REST API and handles HTTP requests and responses.
- **flask-cors** – Allows the React application to communicate with the Flask backend from a different origin.

#### 2.3 Understand the data source

`products_data.json` provides the in-memory data source for the Pivot Table. It contains product records with the following fields.

| Field         | Data type | Description                                |
| ------------- | --------- | ------------------------------------------ |
| `ProductID`   | `number`  | Unique product identifier (primary key)    |
| `ProductName` | `string`  | Name of the product                        |
| `Category`    | `string`  | Category to which the product belongs      |
| `MRP`         | `number`  | Maximum Retail Price of the product        |
| `Discount`    | `number`  | Discount value applied to the product      |

The first three records are shown below for brevity. The complete file contains **16 product records** (identical `ProductName` values across four `Category` values, with incrementing `MRP` and `Discount`).

```json
[
  {
    "ProductID": 10001,
    "ProductName": "Smartwatch",
    "Category": "Electronics",
    "MRP": 100.0,
    "Discount": 1.02
  },
  {
    "ProductID": 10002,
    "ProductName": "Smartwatch",
    "Category": "Accessories",
    "MRP": 110.0,
    "Discount": 1.12
  },
  {
    "ProductID": 10003,
    "ProductName": "Smartwatch",
    "Category": "Home Appliances",
    "MRP": 120.0,
    "Discount": 1.22
  }
]
```

> 📝 The `Discount` field is included for completeness and can be used as an additional value field in the Pivot Table. The minimal report in this sample summarizes only the `MRP` field, so `Discount` does not appear in `dataSourceSettings`.

#### 2.4 Inspect the application entry point

`app.py` configures the Flask application, enables CORS, loads product data from the JSON file, and defines REST endpoints for read and CRUD operations:

```python
# filepath: FlaskAPIServer/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), "products_data.json")
PRIMARY_KEY = "ProductID"

# Load product data from the JSON file.
def load_products():
    if not os.path.exists(DATA_FILE):
        return []

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)

# Store product data in memory.
products = load_products()

# GET /products: returns all product records as JSON.
@app.get("/products")
def list_products():
    return jsonify(products)

# Start the Flask application.
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
```

> 🔒 **Production CORS:** Replace the wildcard `CORS(app)` with an explicit origins list, for example `CORS(app, resources={r"/products*": {"origins": "https://yourdomain.com"}})`.
>
> 🪟 **Windows binding tip:** The server binds to `127.0.0.1` rather than `localhost` to avoid IPv6 resolution issues on Windows, where `localhost` may resolve to `::1` while the React app connects to `127.0.0.1`.

#### 2.5 Review the CRUD endpoints

The CRUD logic is defined alongside the read endpoint in `app.py`. Each route corresponds to a standard HTTP method, so the React client can use simple `fetch` calls.

| HTTP method | Route                       | Purpose                                  |
| ----------- | --------------------------- | ---------------------------------------- |
| `GET`       | `/products`                 | Retrieve all product records             |
| `POST`      | `/products`                 | Create a new product record              |
| `PUT`       | `/products/<int:item_id>`   | Update an existing product by `ProductID`|
| `DELETE`    | `/products/<int:item_id>`   | Delete a product by `ProductID`          |

**Insert endpoint** – `POST /products` reads the new record from the request body, auto-generates a `ProductID` when one is not provided, appends it to the in-memory `products` list, and returns the new record with a `201 Created` status.

```python
# filepath: FlaskAPIServer/app.py
@app.post("/products")
def create_product():
    row = request.get_json(silent=True) or {}
    if not row.get(PRIMARY_KEY):
        max_id = max((r.get(PRIMARY_KEY, 0) for r in products), default=0)
        row[PRIMARY_KEY] = int(max_id) + 1
    products.append(row)
    return jsonify(row), 201
```

**Update endpoint** – `PUT /products/<int:item_id>` locates the record by `ProductID` from the URL, replaces it with the new values, and returns the updated record. Returns `404` if the record is not found.

```python
# filepath: FlaskAPIServer/app.py
@app.put("/products/<int:item_id>")
def update_product(item_id: int):
    row = request.get_json(silent=True) or {}
    for i, current in enumerate(products):
        if int(current.get(PRIMARY_KEY)) == int(item_id):
            row[PRIMARY_KEY] = item_id
            products[i] = row
            return jsonify(row)
    return jsonify({"message": "not found"}), 404
```

**Delete endpoint** – `DELETE /products/<int:item_id>` locates the record by `ProductID` from the URL, removes it from the `products` list, and returns the deleted record. Returns `404` if the record is not found.

```python
# filepath: FlaskAPIServer/app.py
@app.delete("/products/<int:item_id>")
def delete_product(item_id: int):
    for i, current in enumerate(products):
        if int(current.get(PRIMARY_KEY)) == int(item_id):
            deleted = products.pop(i)
            return jsonify(deleted)
    return jsonify({"message": "not found"}), 404
```

> ⚠️ **Persistence:** This sample stores products only in memory. Runtime CRUD changes are discarded when the server restarts (the original contents of `products_data.json` are reloaded on every server start via `load_products()`). To persist changes, replace the in-memory `products` list with logic that writes back to `products_data.json` or a database.

### 3. Frontend – React Pivot Table

The React client lives in the `Client/` folder.

#### 3.1 Install npm dependencies

```bash
cd ../Client
npm install
```

#### 3.2 Install the Syncfusion Pivot Table package and theme

```bash
npm install @syncfusion/ej2-react-pivotview
npm install @syncfusion/ej2-tailwind3-theme
```

> 🎨 For the Tailwind 3 theme used by the current Getting Started guide, install `@syncfusion/ej2-tailwind3-theme`, replace the default contents of `src/index.css` with the PivotView theme import documented in the [Getting Started guide](https://ej2.syncfusion.com/react/documentation/pivotview/getting-started), and confirm that `src/main.tsx` imports `index.css`. Remove Vite's default `App.css` and `index.css` rules if they conflict with the Syncfusion theme.

#### 3.3 Verify the API URL

Open `src/App.tsx` and ensure the `API_BASE` constant points to your backend port (default in this repo: `5000`).

```tsx
// filepath: Client/src/App.tsx
import * as React from 'react';
import { PivotViewComponent, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';
import type { DataSourceSettingsModel, CellEditSettings, BeginDrillThroughEventArgs } from '@syncfusion/ej2-react-pivotview';
import './App.css';
import { useEffect } from 'react';

function App(): React.ReactElement {
  const pivotObj = React.useRef<PivotViewComponent>(null);
  useEffect(() => {
    const initialState = { skip: 0 };
    fetchData(initialState)
      .then((data) => {
        if (pivotObj.current) {
          pivotObj.current.dataSourceSettings.dataSource = data;
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const API_BASE = 'http://localhost:5000'; // Flask server endpoint
  // --- READ (GET) ---
  const fetchData = async () => {
    const url = `${API_BASE}/products`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
    return (await response.json()) as any[];
  };

  const handleActionComplete = async (args: any) => {
    try {
      if (!args || !args.requestType) {
        return;
      }

      const sanitizeItem = (item: any) => {
        if (!item || typeof item !== 'object') {
          return item;
        }
        const sanitized = { ...item };
        delete sanitized.__index;
        return sanitized;
      };

      if (args.requestType === 'save' && args.action === 'add') {
        const item = sanitizeItem(args.data);
        if (item) {
          const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          if (!response.ok) {
            console.error('Create failed', await response.text());
          }
        }
        return;
      }
      if (args.requestType === 'save' && args.action === 'edit') {
        const item = sanitizeItem(args.data);
        const id = item?.ProductID ?? args.primaryKeyValue?.[0] ?? args.previousData?.ProductID;
        if (id != null) {
          const response = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          if (!response.ok) {
            console.error('Update failed', await response.text());
          }
        }
        return;
      }
      if (args.requestType === 'delete') {
        const rows = Array.isArray(args.data) ? args.data : [args.data];
        for (const row of rows) {
          if (!row) continue;
          const id = row?.ProductID;
          if (id == null) continue;
          const response = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
          if (!response.ok) {
            console.error('Delete failed', await response.text());
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const dataSourceSettings: DataSourceSettingsModel = {
    dataSource: [],
    expandAll: true,
    rows: [{ name: 'ProductName' }],
    columns: [{ name: 'Category' }],
    values: [{ name: 'MRP' }],
    filters: [],
  };

  // Enable editing functionality
  const editSettings: CellEditSettings = {
    allowEditing: true,    // Enables the Edit button and allows users to modify existing records.
    allowAdding: true,     // Enables the Add button and allows users to create new records.
    allowDeleting: true,   // Enables the Delete button and allows users to remove records.
    mode: 'Normal'         // Uses Normal mode (popup dialog) for editing; other options: 'Dialog', 'Batch', 'CommandColumn'.
  };

  // Configure beginDrillThrough event to set the primary key for CRUD operations
  function beginDrillThrough(args: BeginDrillThroughEventArgs) {
    // Iterate through all columns in the drill-through grid
    for (let i = 0; i < args.gridObj.columns.length; i++) {
      // Check if the current column is the primary key column
      if (args.gridObj.columns[i].field === "ProductID") {
        args.gridObj.columns[i].visible = true;
        // Mark this column as the primary key
        // This tells DataManager to use this column's value to uniquely identify records
        args.gridObj.columns[i].isPrimaryKey = true;
      }
    }
    const gridObj = args.gridObj;
    if (gridObj) {
      gridObj.addEventListener('actionComplete', (event: any) => {
        handleActionComplete(event);
      });
    }
  }

  return (
    <div className='control-section' style={{ margin: 100 }}>
      <PivotViewComponent
        ref={pivotObj}
        id='PivotView'
        height={350}
        width={700}
        dataSourceSettings={dataSourceSettings}
        showFieldList={true}
        editSettings={editSettings}
        beginDrillThrough={beginDrillThrough}
      >
        <Inject services={[FieldList]} />
      </PivotViewComponent>
    </div>
  );
}

export default App;
```

> 📝 If your Flask server runs on a different port, update the `API_BASE` value in `Client/src/App.tsx` accordingly. The default in this repo is `5000`.

**Code explanation:**

- **`useEffect` + `fetchData`** – When the component mounts, `fetchData()` issues a `GET` request to `${API_BASE}/products` and assigns the resulting array to `dataSourceSettings.dataSource`, so the Pivot Table renders the data on first paint.
- **`handleActionComplete`** – Listens for the drill-through grid's `actionComplete` event and dispatches a request to the appropriate Flask endpoint:
  - `save` + `add` → `POST /products`
  - `save` + `edit` → `PUT /products/{ProductID}`
  - `delete` → `DELETE /products/{ProductID}`
- **`sanitizeItem`** – Strips the internal `__index` property that the drill-through grid adds to records so only clean product data is sent to the API.
- **`dataSourceSettings`** – Defines the Pivot Table report layout.
  - `rows` – Displays **ProductName** values as row headers.
  - `columns` – Displays **Category** values as column headers.
  - `values` – Summarizes the **MRP** field for each row and column combination.
- **`editSettings`** – Enables add, edit, and delete operations on the drill-through grid.
- **`beginDrillThrough`** – Marks the `ProductID` column as the primary key (`isPrimaryKey = true`) before the drill-through grid is displayed, so update and delete operations target the correct record. The handler also attaches the `actionComplete` listener to the grid so CRUD requests are forwarded to the Flask API.
- **`FieldList`** – Displays the Field List and allows fields to be rearranged across rows, columns, values, and filters.

---

## ▶️ Running the Application

You need **two terminals** — one for the backend API and one for the React client.

### ▶️ Start the Backend (Terminal 1)

Make sure your virtual environment is activated (see [step 2.1](#21-create-and-activate-a-virtual-environment)), then from the `FlaskAPIServer` folder run:

```bash
python app.py
```

The server will start and listen on **http://127.0.0.1:5000** by default.

**Verify it works:**

- 🌐 Open `http://127.0.0.1:5000/products` in your browser, or use a tool like Postman/curl.
- ✅ You should see a JSON array of product records.

**Sample request via curl:**

```bash
curl http://127.0.0.1:5000/products
```

**Sample response:**

```json
[
  { "ProductID": 10001, "ProductName": "Smartwatch", "Category": "Electronics", "MRP": 100.0, "Discount": 1.02 },
  { "ProductID": 10002, "ProductName": "Smartwatch", "Category": "Accessories", "MRP": 110.0, "Discount": 1.12 }
]
```

> 📝 Note the port number in the terminal output and update the `API_BASE` in `Client/src/App.tsx` if it is different from `5000`.

### ▶️ Start the Frontend (Terminal 2)

```bash
cd Client
npm run dev
```

The Vite dev server will start and display a URL (typically `http://localhost:5173`).

### ✅ Verify in the Browser

1. Open the URL printed by Vite in your browser.
2. You should see the Pivot Table populated with aggregated **MRP** values, grouped by **ProductName** (rows) and **Category** (columns).
3. Open the browser's **Developer Tools** (F12) → **Network** tab.
4. Reload the page.
5. You should see a `GET` request to `http://127.0.0.1:5000/products` with status `200` and a JSON array containing the product records.
6. The Pivot Table renders the aggregated data automatically.

---

## 🧪 Testing CRUD Operations

The Pivot Table supports full CRUD through its built-in **drill-through editing** grid.

| Step | Action                                                                                                  | Expected Action on Backend                              |
| ---- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1️⃣  | **Double-click** any pivot cell to open the drill-through grid showing underlying source records.       | Initial `GET /products` (read)                          |
| ➕ 2️⃣ | Click **Add**, fill in the new row fields, then click **Update**.                                       | `POST /products`                                        |
| ✏️ 3️⃣ | Click **Edit** on an existing row, change a field, then click **Update**.                                | `PUT /products/{ProductID}`                             |
| 🗑️ 4️⃣ | Click **Delete** on a row to remove it.                                                                  | `DELETE /products/{ProductID}`                          |
| 🔁 5️⃣ | Reload the page (or refresh the Pivot Table) to display the updated aggregated data from the backend.    | New `GET /products` (read)                              |

> 🔑 The `ProductID` column is automatically marked as the primary key inside the `beginDrillThrough` event, so update and delete operations know which record to target. The `actionComplete` event handler attached inside `beginDrillThrough` forwards each CRUD action to the correct Flask endpoint.

> ⚠️ Because data is stored only in memory, any CRUD changes made at runtime are discarded when the server is restarted. This is expected behavior for the sample.

---

## 🔧 Troubleshooting

| ❓ Issue                                | 🔍 Symptom                                                                                                       | ✅ Resolution                                                                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 🚫 Empty Pivot Table                    | Pivot loads with no errors but no rows or values appear.                                                          | Verify that the Flask endpoint returns data and that the field names returned by the backend match the fields configured in `dataSourceSettings` (case-sensitive). |
| 🐍 500 Internal Server Error            | The Pivot Table fails and the browser shows a server error.                                                      | Check the server console for error messages. Verify that `products_data.json` exists, contains valid JSON, and can be read by the backend. |
| 💥 500 on insert with empty data         | Flask returns a `500` error when adding a record.                                                                | `create_product()` computes the new `ProductID` with `max(...) + 1`, which fails if the product list is empty. Ensure `products_data.json` is not empty. |
| 404 Not Found                           | Updating or deleting a record returns a `404` error.                                                              | Verify that the `ProductID` sent in the request URL matches an existing record and that the record has not already been deleted. |
| 🗑️ Delete request to a wrong endpoint   | Delete does not remove the record.                                                                                | The delete handler expects `DELETE /products/{ProductID}`. Confirm the React client builds the URL using `row.ProductID`. |
| 💾 CRUD operations not saving in UI      | The edit dialog closes but changes are not reflected in the Pivot Table.                                          | Verify editing is enabled through `editSettings` and that `ProductID` is configured as the primary key in the `beginDrillThrough` event. Also confirm the `actionComplete` listener is attached inside `beginDrillThrough`. |
| 🧹 Changes lost after server restart     | Records added, updated, or deleted earlier disappear when the Flask server is restarted.                          | This is expected with the sample backend; the `products` list lives in memory and is reloaded from `products_data.json` on every server start. To persist changes, save the modified records to a file or database. |
| 🔄 Changes not reflected in Pivot Table | A CRUD operation completes successfully, but the Pivot Table still shows the old data.                            | Verify the backend processed the request successfully and returned updated data. Check the browser's Network tab for failed requests. If needed, call `pivotObj.current?.refresh();` after an operation. |
| 🌐 CORS Blocked                         | Console shows `Access to XMLHttpRequest ... has been blocked by CORS policy`.                                    | Verify `CORS(app)` is registered in `app.py` and that `flask-cors` is installed in the active virtual environment. |
| 🔤 Property casing mismatch             | Pivot appears empty or shows "field not found" even though the API returns data.                                 | Ensure field names in the API response match the Pivot Table's `dataSourceSettings` (e.g., `ProductID`, `ProductName`). |
| 🔌 Wrong port                           | The frontend cannot reach the backend.                                                                            | Confirm the `API_BASE` in `Client/src/App.tsx` matches the port the Flask server is listening on (default `5000`). |
| 🪟 Windows IPv6 / `localhost` mismatch   | Browser connects to `localhost` but the server is bound to `127.0.0.1`, or vice versa.                            | Bind Flask to `127.0.0.1` (default in this sample) and use `http://127.0.0.1:5000` (or `localhost`, but be consistent) in the React client. |
| 📦 Missing Python packages              | The server fails to start with `ModuleNotFoundError`.                                                              | Ensure your virtual environment is activated and `pip install flask flask-cors` has been run. |

If issues persist, use the browser's **Developer Tools** (**F12**) to inspect the **Network** and **Console** tabs.

---

## 📖 API Reference

The backend exposes REST endpoints through the Flask routes in `app.py`. The React client uses the drill-through grid's `actionComplete` event to call the appropriate endpoint.

| Method   | Route                          | Purpose                                       | Response                                  |
| -------- | ------------------------------ | --------------------------------------------- | ----------------------------------------- |
| `GET`    | `/products`                    | Retrieve product records (initial load)        | JSON array of product records             |
| `POST`   | `/products`                    | Insert a new product                           | The newly added product record (`201`)    |
| `PUT`    | `/products/<int:item_id>`      | Update an existing product by `ProductID`      | The updated product record                |
| `DELETE` | `/products/<int:item_id>`      | Delete a product by primary key                | The deleted product record                |

A product record exposes the following fields:

| Field         | Type     | Description                                |
| ------------- | -------- | ------------------------------------------ |
| `ProductID`   | `number` | Unique product identifier (primary key)    |
| `ProductName` | `string` | Name of the product                        |
| `Category`    | `string` | Category to which the product belongs      |
| `MRP`         | `number` | Maximum Retail Price of the product        |
| `Discount`    | `number` | Discount value applied to the product      |

---

## 🤝 Contributing

Contributions are welcome and appreciated! 💖

1. 🍴 **Fork** the repository.
2. 🌿 **Create** a feature branch: `git checkout -b feature/my-awesome-change`
3. 💾 **Commit** your changes: `git commit -m "Add my awesome change"`
4. 📤 **Push** to your branch: `git push origin feature/my-awesome-change`
5. 🔁 **Open** a Pull Request describing the change and its motivation.

### 📋 Contribution Guidelines

- Follow the existing code style in both the React and Flask projects.
- Keep changes focused — one feature or fix per pull request.
- Update or add documentation (`README.md`, `flaskapi-server.md`) when behavior changes.
- Test your changes locally against both the backend and frontend before submitting.

---

## 📜 License & Support

### 📄 License

This project is released under the **MIT License**. You are free to use, modify, and distribute the code in personal and commercial projects. See the `LICENSE` file for full text.

### 🛟 Support

- 📘 **Documentation:** [Syncfusion® React Pivot Table Docs](https://ej2.syncfusion.com/react/documentation/pivotview/getting-started)
- 💬 **Community forum:** [Syncfusion® Community](https://www.syncfusion.com/forums)
- 🐛 **Bug reports & feature requests:** [GitHub Issues](https://github.com/SyncfusionExamples/syncfusion-react-pivot-with-flask-api/issues)
- 📧 **Direct support:** [Syncfusion® Support Portal](https://www.syncfusion.com/support) (for licensed users)
- 📖 [Flask Documentation](https://flask.palletsprojects.com/)
- 🔀 [Flask-CORS Documentation](https://flask-cors.readthedocs.io/)
- 🐍 [Python venv Guide](https://docs.python.org/3/library/venv.html)

> ⭐ If this project helped you, please consider giving it a **star** on GitHub — it helps others discover it!

---

## 📚 Related Resources

- 🔗 [Syncfusion® React Pivot Table – Getting Started](https://ej2.syncfusion.com/react/documentation/pivotview/getting-started)
- 📘 [PivotTable Data Binding](https://ej2.syncfusion.com/react/documentation/pivotview/data-binding)
- 📘 [PivotTable Editing](https://ej2.syncfusion.com/react/documentation/pivotview/editing)
- 📘 [PivotTable Drill-Through](https://ej2.syncfusion.com/react/documentation/pivotview/drill-through)
- 🌶️ [Flask Documentation](https://flask.palletsprojects.com/)
- 🔀 [Flask-CORS Documentation](https://flask-cors.readthedocs.io/)
- 🐍 [Python venv Guide](https://docs.python.org/3/library/venv.html)
- ⚡ [Vite Documentation](https://vitejs.dev/)

---

<div align="center">
  <sub>Built with ❤️ using <a href="https://react.dev/">React</a>, <a href="https://flask.palletsprojects.com/">Flask</a>, and <a href="https://www.python.org/">Python</a> by the <a href="https://www.syncfusion.com/">Syncfusion®</a> team.</sub>
</div>
