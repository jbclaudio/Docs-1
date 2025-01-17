---
title: 'Data Browser'
meta_title: 'Appbase.io - Data Browser'
meta_description: 'Data Browser is a WYSIWYG GUI for adding, modifying and viewing your appbase.io data.'
keywords:
    - dataschema
    - appbase
    - databrowser
    - data-ui
    - mappings
    - elasticsearch
sidebar: 'docs'
---

Data Browser is a WYSIWYG GUI for adding, modifying and viewing your appbase.io app's data.

Data is stored as JSON documents. You can read more about how to model your data over [here](/docs/data/model/).

## Installation

The data browser is available within appbase.io dashboard. But it can also be:

-   run as a [docker container](https://hub.docker.com/r/appbaseio/dejavu) or
-   used as a hosted app [here](https://dejavu.appbase.io).

## Creating An App

You can go to the [appbase.io dashboard](https://dashboard.appbase.io) view of your cluster and create an index.

![](https://www.dropbox.com/s/vr01bg1mlyrej87/create_app_new.gif?raw=1)

## Adding Your First Data

You can access the databrowser from the dashboard view of your cluster or independently via the [Dejavu app](https://dejavu.appbase.io).

![](https://www.dropbox.com/s/yiztpv6uz11v0kl/add_data.gif?raw=1)

Follow the above steps to add your first data.

## Adding New Field

Dejavu now also supports adding new fields, including setting the appropriate mappings for the field.

You have to first be in the **Editing** mode. And then select the `+` button near the field name headers in the column display on the top right.

![](https://www.dropbox.com/s/m1mg8l4qp8j2zd2/adding_field.gif?raw=1)

You can pick from the one of the available data types or set your own mapping.

### Field Data Types

Field data types are present in one of three shapes:

1. **Primitive**: Text, Keyword, Integer, Float, Double, Date, Geo Point, Boolean are some examples.

2. **Array**: An array shape in appbase.io is just a container that can hold one or more values of the primitive data type. There is no special data type associated with it.

3. **Object**: An object shape in appbase.io acts as a container that can hold a nested JSON object, each keys of which representing a primitive data type or another object / array container.

Beyond the primitive data types, there are also specialized data types that are specific to a search engine, like `completion`, `ip`, `percolator`. You can read all about the supported data types over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html).

### How to Set Mappings

You can use:

1. **Data Browser**: The data browser UI can be used to set mappings via the `Add New Field` UI button.

![](https://i.imgur.com/51KlukI.png)

The UI supports adding all the primitive types. You can set your own mapping object for creating a specialized type or if you want to set any non-default options within a type.

OR

2. **Schema UI**: The Schema view gives you an overall view of your index's fields. You can set a specific use-case, data type, add a new field to the index or remove a field from the index. Read more for the Schema UI docs over [here](/docs/search/relevancy/#schema).

OR

3. **REST API**: You can use the REST API to set the mappings using the [PUT /_mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html) endpoint.

> Note <i class="fa fa-info-circle"></i>
>
> Mappings are immutable in Elasticsearch. Once set, they can't be changed.


## Operations

### Adding Data

The data browser allows adding data as a single JSON object or multiple JSON objects (passed as an array). It is recommended to pass up to 100 objects at a time.

### Updating Existing Data

Existing data records can be updated easily. Select a record from the view and tap the **Update** button.

![](https://i.imgur.com/ErYSZhC.png)

### Deleting Data

Data records can also be deleted easily. Select a record (or multiple) from the view and tap the **Delete** button.

![](https://i.imgur.com/eDeAIXY.png)

## Importing Data

You can directly import JSON or CSV data files into appbase.io using the **[data import](https://importer.appbase.io)** functionality.

Here is a pic showing import of a JSON file when creating a new app.

![](https://i.imgur.com/5rDcX0Z.png)

The import view lets you set the data mappings via a GUI and index data. Currently, it supports up to 100,000 records at a time (or up to 100 MB of data).

Once your data is imported, you can view the data via the [browser view](https://dashboard.appbase.io/browser).

#### Setting a Unique Document ID

When importing a frequently changing dataset, we recommend setting a **Unique Id** field. This can be enabled by selecting the checkbox for "Does the data have unique id?" question followed by selecting an id column (a **Mark as Id column** label should appear in the active column).

![](https://i.imgur.com/0aooxFY.png)

Setting a Unique Id column ensures that your dataset doesn't create duplicate documents across re-imports.

**When is it a good idea to use this feature?**

-   Do you frequently update existing documents?
-   Are you importing data from another data source (e.g. MongoDB, Google Analytics) where you already have a unique Id column?
-   Do you plan to interact with the imported data via code?
-   Do you have more than 1,000 documents?

You don't need to use this feature if your documents are never the same or if you are dealing with a very small set of documents.

#### Expected Formats

**JSON**

-   Spaces and/or special characters used in field names are automatically replaced with acceptable characters in the import view,
-   The expected shape for the JSON file is an Array of document objects.

```json
[
  {
    "field": "value",
    "nested_field": {
      "field": "value"
    },
    "array_field": ["A", "B"]
  },
  {
    ...
  }
]
```

**CSV**

-   If you are importing a CSV file, we treat the first row as the column **headers** row.
-   Spaces and/or special characters used in field names are automatically replaced with acceptable characters in the import view.
-   To set a null value in a specific cell, either leave the cell as empty or explicitly use the `null` keyword.
-   Column names ending with `lat` and `lon` are automatically detected to be of Geopoint datatype.
-   Setting an `Array` field from a CSV file requires the cell data to be wrapped in `"[..]"` brackets, e.g. `"[key1, key2]"`. (Note: If you are editing in Excel, the wrapping quotes (") aren't required)
-   Setting a nested field from a CSV file requires using a dot notation, e.g. `nested_field.a` and `nested_field.b` column names will be imported as sibling fields `a` and `b` within the `nested_field` field.

## Doing more with data

The dashboard offers a great way to get started with appbase.io with importing data and applying search relevancy settings. From here on, you can create a Test UI and start progressively working with analytics, query rules and security features.
