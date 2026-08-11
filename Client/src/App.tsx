import * as React from 'react';
import { PivotViewComponent, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';
import type { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
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
  const editSettings: any = {
    allowEditing: true,    // Enables the Edit button and allows users to modify existing records.
    allowAdding: true,     // Enables the Add button and allows users to create new records.
    allowDeleting: true,   // Enables the Delete button and allows users to remove records.
    mode: 'Normal'         // Uses Normal mode (popup dialog) for editing; other options: 'Dialog', 'Batch', 'CommandColumn'.
  };


  // Configure beginDrillThrough event to set the primary key for CRUD operations
  function beginDrillThrough(args: any) {
    // Iterate through all columns in the drill-through grid
    for (var i = 0; i < args.gridObj.columns.length; i++) {
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
      <PivotViewComponent ref={pivotObj} id='PivotView' height={350} width={700} dataSourceSettings={dataSourceSettings} showFieldList={true} editSettings={editSettings} beginDrillThrough={beginDrillThrough}>
        <Inject services={[FieldList]} />
      </PivotViewComponent>
    </div>
  );
}

export default App;