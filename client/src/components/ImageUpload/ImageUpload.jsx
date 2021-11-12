import { BsCardImage } from "react-icons/bs";
export default function ImageUpload({ onChange }) {
  return (
    <label className="input-image">
      <BsCardImage style={{ width: "1rem", height: "1rem" }} />
      <input onChange={onChange} name="image" type="file" placeholder="Image" />
    </label>
  );
}
