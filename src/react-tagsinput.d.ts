declare module "react-tagsinput" {
  import type { ComponentType } from "react";

  interface TagsInputProps {
    value: readonly string[];
    onChange: (tags: string[]) => void;
    addOnBlur?: boolean;
    id?: string;
    [key: string]: unknown;
  }

  const TagsInput: ComponentType<TagsInputProps>;
  export default TagsInput;
}
