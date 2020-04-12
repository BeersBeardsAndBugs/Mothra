import React, { useState, useRef } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

export const Search = ({ classes }) => {
  const [search, setSearch] = useState("");
  const searchAnchor = useRef(null);
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Google Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            searchAnchor.current.click();
          }
        }}
      />
      <a
        href={"https://www.google.com/search?&q=" + search}
        target="_blank"
        rel="noopener"
        ref={searchAnchor}
      />
    </div>
  );
};
