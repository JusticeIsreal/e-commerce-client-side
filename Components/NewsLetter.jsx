import React from "react";

function NewsLetter() {
  return (
    <div>
      <section className="newsletter">
        <form action="">
          <h3>Subscribe for latest updates</h3>
          <input
            type="email"
            name=""
            placeholder="Enter your email"
            id=""
            className="box"
          />
          <input type="submit" value="subscribe" className="btn" />
        </form>
      </section>
    </div>
  );
}

export default NewsLetter;
