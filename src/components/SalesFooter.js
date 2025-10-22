export default function SalesFooter() {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        <div className="footer-column">
          <h4 className="footer-heading">Actions</h4>
          <ul className="footer-list">
            <li>Summarist Magazine</li>
            <li>Cancel Subscription</li>
            <li>Help</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Useful Links</h4>
          <ul className="footer-list">
            <li>Pricing</li>
            <li>Summarist Business</li>
            <li>Gift Cards</li>
            <li>Authors & Publishers</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-list">
            <li>About</li>
            <li>Careers</li>
            <li>Partners</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <p>Copyright © 2023 Summarist.</p>
      </div>
    </footer>
  );
}
