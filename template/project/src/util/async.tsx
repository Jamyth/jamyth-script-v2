import React from "react";

type ReactComponentTypeOf<T> = {
  [P in keyof T]: T[P] extends React.ComponentType<any> ? P : never;
}[keyof T];

export const async = <T, K extends ReactComponentTypeOf<T>>(
  resolve: () => Promise<T>,
  key: K,
  loadingComponent: React.ReactElement | null = null
): T[K] => {
  return React.memo((props: any) => {
    const [
      Component,
      setComponent,
    ] = React.useState<React.ComponentType<any> | null>(null);

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
  }) as T[K];
};
