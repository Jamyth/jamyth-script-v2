import React from "react";

export const async = (resolve, key, loadingComponent = null) => {
  return React.memo((props) => {
    const [Component, setComponent] = React.useState(null);

    const load = async () => {
      try {
        const module = await resolve();
        setComponent(() => module[key]);
      } catch (err) {
        console.error(err);
        console.error(`Cannot load module ${key}`);
      }
    };

    React.useEffect(() => {
      load();
    }, []);

    return Component ? <Component {...props} /> : loadingComponent;
  });
};
