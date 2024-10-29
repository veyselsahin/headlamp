import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { KubeObject, KubeObjectClass } from '../../../lib/k8s/KubeObject';
import { CreateResourceButton } from '../CreateResourceButton';
import SectionBox from '../SectionBox';
import SectionFilterHeader, { SectionFilterHeaderProps } from '../SectionFilterHeader';
import ResourceTable, { ResourceTableProps } from './ResourceTable';

export interface ResourceListViewProps<Item extends KubeObject>
  extends PropsWithChildren<Omit<ResourceTableProps<Item>, 'data'>> {
  title: ReactNode;
  headerProps?: Omit<SectionFilterHeaderProps, 'title'>;
  data: Item[] | null;
}

export interface ResourceListViewWithResourceClassProps<ItemClass extends KubeObjectClass>
  extends PropsWithChildren<Omit<ResourceTableProps<InstanceType<ItemClass>>, 'data'>> {
  title: ReactNode;
  headerProps?: Omit<SectionFilterHeaderProps, 'title'>;
  resourceClass: ItemClass;
}

export default function ResourceListView<ItemClass extends KubeObjectClass>(
  props: ResourceListViewWithResourceClassProps<ItemClass>
): ReactElement;
export default function ResourceListView<Item extends KubeObject<any>>(
  props: ResourceListViewProps<Item>
): ReactElement;
export default function ResourceListView(
  props: ResourceListViewProps<any> | ResourceListViewWithResourceClassProps<any>
) {
  const { title, children, headerProps, ...tableProps } = props;
  const withNamespaceFilter = 'resourceClass' in props && props.resourceClass?.isNamespaced;
  const resourceClass = (props as ResourceListViewWithResourceClassProps<any>)
    .resourceClass as KubeObjectClass;

  return (
    <SectionBox
      title={
        typeof title === 'string' ? (
          <SectionFilterHeader
            title={title}
            noNamespaceFilter={!withNamespaceFilter}
            titleSideActions={
              headerProps?.titleSideActions ||
              (resourceClass ? [<CreateResourceButton resourceClass={resourceClass} />] : undefined)
            }
            {...headerProps}
          />
        ) : (
          title
        )
      }
    >
      <ResourceTable {...tableProps} />
      {children}
    </SectionBox>
  );
}
