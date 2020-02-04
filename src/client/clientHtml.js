const ClientHtml = ({ body, helmet }) =>
    `
    <!DOCTYPE html>
    <HTML>
	    <head>
			${helmet.meta.toString()}
            ${helmet.title.toString()}
        </head>
        <body>
			<div id="root">${body}</div>
            <script src="main.client.js"></script>
            <script src="runtime.client.js"></script>
		</body>
	</HTML>
`;

export default ClientHtml;
