import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

export const Search = ({ classes }) => {
  const [search, setSearch] = useState("");
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
            const a = document.createElement("a");
            a.href = "https://www.google.com/search?&q=" + search;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.click();
          }
        }}
      />
    </div>
  );
};
