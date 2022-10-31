import { render, screen } from "@testing-library/react";

import PostList from "../../../components/posts/PostList";

describe("Posts", () => {
  it("renders PostList component", () => {
    render(
      <PostList posts={[{ id: 1, body: "hola", title: "titulo", userId: 2 }]} />
    );
    expect(screen.getByText("hola")).toBeInTheDocument();

  });
});
