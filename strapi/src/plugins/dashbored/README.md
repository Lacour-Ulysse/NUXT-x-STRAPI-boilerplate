# dashbored

## Custome Homepage/Dashboard

Created with a custom plugin thanks to [Dan Grebb](https://github.com/dgrebb) work, based on this [article](https://www.dgrebb.com/post/strapi-cms-admin-panel-customization-post-version-4-15-0/).

Plugin can be edited in `/src/plugins/dashbored`.

And also `node_modules/@strapi/admin/admin/src/pages/HomePage/index.js` has been edited and is tracked thanks to patch-package :

For Strapi v4.13.5 replace `node_modules/@strapi/admin/admin/src/pages/HomePage/index.js` with :

```js
import { Redirect } from "react-router-dom";
import React, { useMemo } from "react";

import { useEnterprise } from "../../hooks/useEnterprise";

export const HomePageCE = () => {
  return <Redirect to={"/plugins/dashbored"} />;
};

function HomePageSwitch() {
  const HomePage = useEnterprise(
    HomePageCE,
    // eslint-disable-next-line import/no-cycle
    async () => (await import("../../../../ee/admin/pages/HomePage")).HomePageEE
  );

  // block rendering until the EE component is fully loaded
  if (!HomePage) {
    return null;
  }

  return <HomePage />;
}

export default HomePageSwitch;
```

To keep track of the patched version of `@strapi/admin` from root folder run :

```bash
yarn --cwd "strapi/" patch-package @strapi/admin
```

Then rebuild the app :

```bash
bash dev-server.sh
```
