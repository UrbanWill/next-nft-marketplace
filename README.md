## Next front end for NFT Marketplace store

## Getting Started

To run the development server:

```bash
yarn dev
```

## Generating type safe hooks:

Visit the [supergraph schema docs](https://studio.apollographql.com/public/willian-urbans-team-3zfryq/home?variant=main) to view available operations.

Commands:

```bash
codegen:auth
codegen:thegraph
```

To generate a new apollo type safe hook add a file with `.graphql` extension containing the request request to the correct subgraph/operation folder and run the code gen command for that service, the hook will be generated in the `generated/{SUBGRAPH_NAME}.ts` file.

Eg how to generate a hook to fetch an active item by id:

Add a file with the name `getActiveItem.graphql` to `/graphql/theGraph/queries` containing the request:

```
query ActiveItem($activeItemId: ID!) {
  activeItem(id: $activeItemId) {
    id
    buyer
    seller
    nftAddress
    tokenId
    price
  }
}
```

Then run the codegen command for the graph subgraph:

```bash
codegen:thegraph
```

The type safe apollo graphql custom hook will generated in `/generated/theGraph.ts` file.
