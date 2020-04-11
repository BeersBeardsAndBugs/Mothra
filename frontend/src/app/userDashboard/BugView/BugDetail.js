import React from 'react';

const BugDetailPane = () => {

    return (

      <div>
        <div className="top_banner">
          <>{`${data.bug.title}`}</>
          <>ID = {`${data.bug.id}`}</>
          <>{`${data.bug.status}`}</>
        </div>
        <div className="description_form">
          <form>
          <label>description</label>
          <input size="100" defaultValue={data.bug.description}></input>
          <br></br>
          <label>Date Created</label>
          <input size="100" defaultValue={data.bug.dateCreated}></input>
          <br></br>
          <label>Created By</label>
          <input size="100" defaultValue={data.bug.createdBy}></input>
          <br></br>
          <label>Status</label>
          <input size="100" defaultValue={data.bug.status}></input>
          <br></br>
          <label>Attachments</label>
          <input size="100" defaultValue={data.bug.attachments}></input>
          <br></br>
          <label>Comments</label>
          <input size="100" defaultValue={data.bug.comments}></input>
          <br></br>
          <label>History</label>
          <input size="100" defaultValue={data.bug.history}></input>
          <br></br>
          <input type="submit"/>
          </form>
        </div>
      </div>
    );
  
}
export default BugDetailPane;