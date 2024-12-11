# Cards - Matrix

## Description

Displays a row of cards with the data being sourced from the chilren of the selected Matrix asset.

## Matrix setup

This requires a Matrix instance to be set up to source the data.

### Environment variables

We need to set up environment variables to source the data across production and development. To allow for different configuration between project setups, use the following:

An example of this for the URL https://mywebsite.com/foldername/ would be:

```
BASE_DOMAIN="https://mywebsite.com/"
BASE_PATH="foldername/"
API_IDENTIFIER="youridentifierhere"
```

Add an `.env` file to your project root directory with the above information. The Component service API identifier can be found on your site asset, under the DXP Configuration screen.

Once your environment variables have been set up, these need to be declared in the `manifest.json` file.

```
"environment": [
  {
    "name": "API_IDENTIFIER",
    "required": true
  },
  {
    "name": "BASE_DOMAIN",
    "required": true
  },
  {
    "name": "BASE_PATH",
    "required": true
  }
]
```

### Setting up a proxy listing

To retrieve all the required data, we need a list of IDs of the assets we want data for. In the `manifest.json` file, we have defined the rootnode as a string, with the "format": "matrix-asset-uri". This will return a URI containing the ID of the selected asset.

In Matrix, create an Asset Listing within the API site under the Configuration folder.

On the details screen of your asset listing, set the following configuration:

- Asset types to list: Standard Page + Content Page, or any other asset types for your specific needs
- Root nodes: Choose your website site asset
- Dynamic parameters: Add "Replacement Root node for the listing (must be a child of the static root node)" and set the GET Variable Name to `node`

Edit the "Page Contents" of your Asset Listing. We will use Serverside JavaScript to output the data for our assets as JSON. Use the script below to format the output.

```
<script runat="server">
    // Declare our output variable
    const output = [];

    // Set all the data from each listing item
    %asset_listing%

    // Output the JSON
    print(JSON.stringify(output));
</script>
```

Edit the "Default Format" of your Asset Listing Types. Add your data as Serverside JavaScript in the following format. This will be called for each listing item.

```
(() => {
    let data = {
        "id": "%asset_assetid^json_encode%",
        "heading": "%asset_name^json_encode%",
        "link": "%asset_url^json_encode%",
    }

    // Add the thumbnail, if it exists
    const image = "%asset_thumbnail_assetid%";
    if ( image !== "" && image !== null ) {
        data.image = {
            "url": "%asset_thumbnail_assetid^as_asset:asset_url^json_encode%",
            "attributes": {
                "id": "%asset_thumbnail_assetid^json_encode%",
                "alt": "%asset_thumbnail_assetid^as_asset:asset_attribute_alt^json_encode%",
                "width": "%asset_thumbnail_assetid^as_asset:asset_attribute_width^json_encode%",
                "height": "%asset_thumbnail_assetid^as_asset:asset_attribute_height^json_encode%"
            }
        };
    }

    output.push(data);
})();

Edit the Page Content (No results) and set the following code:
```

[]

```

View the Designs screen of your Asset Listing. Set the Design to use the JSON design from the Configuration folder. This design will set the headers for the page to tell the browser the format is JSON.

View the Paint Layouts screen of your Asset Listing. Set the Paint Layout to use the Asset Contents Only Paint layout. This will remove the header/footer section of your website and only output the contents of your asset listing.

Preview your asset listing in a new window. By default, it will display an empty array, because we have not provided the `node` as a GET parameter. Copy the ID of an asset that has child pages in your Matrix instance that are Live and use these in the GET parameter, such as below:
```

https://mywebsite.com/foldername/_api/my-node-listing?node=12345

```

You should see the data of the child assets of the asset you selected. Ensure that the assets you are selecting are LIVE, as when the call is made from your development environment, it will not have permissions to view assets that are Under Construction.

### Working locally

In your example.data.json, ensure that you use valid Matrix Asset URIs from your website for testing purposes, otherwise you won't retrieve data from Matrix. Once the example data and manifest files are correct, you can continue development of your component locally.

### Deploying environment variables

When your component development is complete and you have deployed it to the DXP, the environment variables will need to be added to your component set configuration in the DXP, if they don't exist already. These may be different to your local development environment variables, so be sure to verify the correct settings for the environment the set is used on.

## Editing

Editors can choose a title and link to appear above the row of cards. Each card will have the title, thumbnail and link sourced from the children of the selected asset. A solid colour background is displayed if no image is provided. A minimum of 1 card is required, with a maximum of 8.

## Properties Example:

```

{
"title": "Cards",
"link": {
"text": "CTA text link",
"url": "https://squiz.net",
"target": "\_blank"
},
"rootnode": "matrix-asset://api-identifier/44954"
}

```

## Component Properties

| Property       |        Property Description         |    Property Type      | Is Required | Default |
| :------------- | :---------------------------------: | :-------------------: | :---------: | :-----: |
| title          |    The title above the card grid    |       string          |             |         |
| link           |       Link next to the title        | string (SquizLink)    |             |         |
| rootnode       |        Matrix Asset                 |string (MatrixAssetUri)|      ✓      |         |
```
