# Gmail student reply automation

A private administrative tool operated by Matthew Lee for Coffee Chat w/ Matt. It checks his own Gmail inbox for English conversation inquiries and helps him keep track of which conversations need attention. It is not offered as a public Gmail integration, and students do not connect their Google accounts.

## How it works

The tool reads new-mail history, email messages, thread context, and sending-identity settings. When separately enabled by the owner, it can send one first reply to a clear, first-time student inquiry from the verified conversations@annna.dev address. Later replies and ambiguous or sensitive requests are held for human attention. Sending is disabled during setup and verification.

It requests only Gmail read access (gmail.readonly) and sending access (gmail.send). It does not request permission to delete email or change read/unread labels. It starts from a new-mail baseline rather than sending replies to old messages.

## Privacy

Google email data is used to identify new inquiries, avoid duplicate replies, check the correct sender and thread, and prepare concise operational status reports for the owner. The tool reads message contents and headers while processing; its local tracking database stores message and thread identifiers, correspondent addresses, subjects, classifications, status, timestamps, and reply-attempt records. It does not persist raw Gmail message bodies in that database.

The tool runs on the owner's hosted server. OAuth credentials are stored in Bitwarden. Concise operational summaries may be routed to the owner's Discord channels and handled by the configured assistant service; these summaries can contain correspondent addresses and subjects, but the pipeline does not include raw email bodies in its reports. Email data is not sold or used for advertising. Gmail-derived data is not used to train generalized AI models.

Tracking records remain until the owner removes them, so duplicate prevention and conversation status continue to work. Server backups may retain copies according to the backup schedule. This tool does not provide a student account or a self-service deletion screen. Contact the owner about data access or deletion requests.

The tool's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements: https://developers.google.com/terms/api-services-user-data-policy

## Access and use

Only the owner authorizes Gmail access. Authorization can be withdrawn at https://myaccount.google.com/connections, and the owner can disable polling or sending on the server. Withdrawing authorization stops future API access; it does not automatically erase existing tracking records or backups.

This page documents the private tool's operation. It does not offer public account registration or change the terms of any English conversation service. No student must authorize this tool to make an inquiry.

## Contact

Questions about this tool or its data handling: conversations@annna.dev.

Updated 24 September 2026.
