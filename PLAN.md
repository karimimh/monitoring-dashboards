Adding Variables:
  - Get Dashboard Json from backend
    { 
      "id": "12345",
      "name": "My Dashboard",
      "panels": [{
        "name": "Panel 1",
        "index": 0,
        Query: ["show me the data"],
      }],
      "variables": [{
        "name": "var1",
        "query": "SELECT * FROM table WHERE condition = true"
      }]
    }
  - Each variable is a query which you should use /query endpoint, this will be a list of strings
    show tag values from system with key = host
    [
      "host1",
      "host2",
      "host3"
    ]
  - variables will be used in the query like this: 
    SELECT mean(load5) FROM system WHERE host =~ /^$server$/
    ( server is a variable name )
    Select mean(load5) FROM system WHERE host =~ /^host1$/ # if user selects host1

    SELECT mean(load5) FROM system WHERE host =~ /^(host1|host2|host3)$/ # if user selects all this is optional consult before adding it.
  
  - also time range should be a variable named timeFilter
Changing RAW Query to Structured:
  - For adding a new query to dashboard:
  add queries like grafana
  measurement: show measurements
  where: show tag keys from measurement = show tag values from measurement with key = key
  field: show field keys from measurement
  function: get from grafana => mean, sum, count, min, max, ...


Structured Query Queries:
  1. SELECT <TEXTBOX1> FROM <TEXTBOX2> WHERE <PlUS BUTTON> || SELECT <TEXTBOX1> FROM <TEXTBOX2> WHERE <TEXTBOX3>=~<TEXTBOX4> <PLUS BUTTON>
  2. TEXTBOX1: show field keys from <TEXTBOX2>
  3. TEXTBOX2: show measurements
  4. TEXTBOX3: show tag keys from <TEXTBOX2>
  5. TEXTBOX4: show tag values from <TEXTBOX2> where key=<TEXTBOX3>