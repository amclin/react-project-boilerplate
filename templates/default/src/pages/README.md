**Do not create new NextJS pages from scratch.** Instead, use the wizard to guide you through the process of stubbing out the necessary files and structures expected for each type of component. See [Creating New Components](../../CONTRIBUTING.md#new-components)

The `/pages` folder is provided for [NextJS filesystem-based routing](https://nextjs.org/docs).

Over time, this means the `/pages` folder will get very messy as
every page, its dependencies, and test files would all be dumped in
one place. This is mitigated by putting each page in its own folder:

```
Folder structure for http://example.com/my-directory/my-page

- /pages
  - /my-directory
    - /my-page
      - index.js
```
