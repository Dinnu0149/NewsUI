import React, { useCallback, useMemo, useContext, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import NewsContext from "../../contexts/NewsContex";
import { NavLink } from "react-router-dom";

const NavigationHeader = () => {
  const { getTagItemsData, getTagItemsIsLoading, fetchTags } =
    useContext(NewsContext);

  useEffect(() => {
    fetchTags();
  }, []);

  const tagsDropdownItems = useMemo(() => {
    getTagItemsIsLoading && <NavDropdown.Item>Loading...</NavDropdown.Item>;
    return getTagItemsData.map((tag) => (
      <NavDropdown.Item as={NavLink} key={tag.id} to={`/news/tag/${tag.name}/${tag.id}`} className="">
        {tag.name}
      </NavDropdown.Item>
    ));
  }, [getTagItemsData]);

  const adminDropdownItems = useMemo(() => {
    return (
      <>
        <NavDropdown.Item as={NavLink} to="/news/create">
          Create News
        </NavDropdown.Item>
      </>
    );
  }, []);

  const handleTagsToggle = useCallback((isOpen) => {
  }, []);

  const handleAdminToggle = useCallback((isOpen) => {
  }, []);

  return (
    <Navbar bg="danger" expand="lg" fixed="top" className="mb-5">
      <Container fluid>
        <Navbar.Brand as={NavLink} href="#" className="text-white fw-bold ms-1 ms-lg-5">
          <i className="fa-solid fa-rss me-2"></i>
          24HNews
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto me-5">
            <Nav.Link as={NavLink} to="/" className="text-white fw-bold">
              News
            </Nav.Link>

            <NavDropdown
              title="Tags"
              id="tags-dropdown"
              className="text-white fw-bold me-5"
              onToggle={handleTagsToggle}
            >
              {tagsDropdownItems}
            </NavDropdown>

            {/* <NavDropdown
              title="Admin"
              id="admin-dropdown"
              className="text-white fw-bold"
              onToggle={handleAdminToggle}
            >
              {adminDropdownItems}
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(NavigationHeader);
