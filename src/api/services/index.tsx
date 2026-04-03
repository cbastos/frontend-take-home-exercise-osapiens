const requireAllServices = (ctx: any): React.FC<any>[] => {
  const keys = ctx.keys().filter((key: string) => key !== "./index.tsx");
  const modules = keys.map(ctx);

  return modules
    .map((module: any) => module.StoreProvider)
    .filter((provider: React.FC<any> | undefined) => Boolean(provider)) as React.FC<any>[];
};

const getAllServices = (): React.FC<any>[] => {
  const context = (require as any).context(".", true, /index\.tsx$/);
  return requireAllServices(context);
};

export default getAllServices();
