import React from "react";
import "./MovieDetailTable.css";

function MovieDetailTable(props) {
  const { data } = props;
  return (
    <div className="more-detail-container">
      <table>
        <tbody>
          <>
            {data.directedBy?.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderTop: index === 0 && "1px solid #dedede",
                  borderBottom:
                    index === data.producedBy.length - 1 && "1px solid #dedede",
                }}
              >
                <th>{index === 0 && "Directed By"}</th>
                <td>
                  {item.bioUrl ? (
                    <p className="more-detail-name">
                      <a
                        style={{ textDecoration: "none" }}
                        href={item.bioUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                    </p>
                  ) : (
                    <p
                      key={index}
                      className="more-detail-name"
                      style={{ marginBottom: "1px" }}
                    >
                      {item.name}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </>

          <>
            {data.producedBy?.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderTop: index === 0 && "1px solid #dedede",
                  borderBottom:
                    index === data.producedBy.length - 1 && "1px solid #dedede",
                }}
              >
                <th>{index === 0 && "Produced By"}</th>
                <td>
                  {item.bioUrl ? (
                    <p className="more-detail-name">
                      <a
                        style={{ textDecoration: "none" }}
                        href={item.bioUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                    </p>
                  ) : (
                    <p
                      key={index}
                      className="more-detail-name"
                      style={{ marginBottom: "1px" }}
                    >
                      {item.name}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </>
          <>
            {data.productionCompanies?.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderTop: index === 0 && "1px solid #dedede",
                  borderBottom:
                    index === data.productionCompanies.length - 1 &&
                    "1px solid #dedede",
                }}
              >
                <th>{index === 0 && "Production Companies"}</th>
                <td>
                  {item.infoUrl ? (
                    <p className="more-detail-name">
                      <a
                        style={{ textDecoration: "none" }}
                        href={item.infoUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                    </p>
                  ) : (
                    <p
                      key={index}
                      className="more-detail-name"
                      style={{ marginBottom: "1px" }}
                    >
                      {item.name}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </>
          <tr>
            <th>Budget</th>
            <td>
              <p className="more-detail-value">$ {data.budget}</p>
            </td>
          </tr>
          <tr>
            <th>Box Office</th>
            <td>
              <p className="more-detail-value">$ {data.boxOffice}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MovieDetailTable;
