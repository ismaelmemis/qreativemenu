import { CreateCategoryForm } from './create-category-form';

export default function CreateCategory({ menuId }: { menuId: string }) {
  return <CreateCategoryForm menuId={menuId} />;
}
