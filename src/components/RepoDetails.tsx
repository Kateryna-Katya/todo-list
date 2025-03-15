const RepoDetails = ({ repoDetails }: { repoDetails: any }) => {
    return (
      <div className="mb-3">
        <h5>
          <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
            {repoDetails.full_name}
          </a>
        </h5>
        <p>
          Owner:{" "}
          <a href={repoDetails.owner.html_url} target="_blank" rel="noopener noreferrer">
            {repoDetails.owner.login}
          </a>
        </p>
      </div>
    );
  };
  
  export default RepoDetails;