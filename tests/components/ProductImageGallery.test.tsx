import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";
describe("ProductImageGallery", () => {
  it("should be empty if the image array is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const imageUrl = ["url1", "url2"];

    render(<ProductImageGallery imageUrls={imageUrl} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imageUrl.length);
    imageUrl.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
