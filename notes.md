curl -i -X POST \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
--data '{"transactions":[{"assignedCategory":"24f82762-0d78-4414-bb83-8a3a91403a2b","ballance":0,"cardId":"ae2b4a2c-c312-4b93-b93a-29bf66789b7b","categoryId":null,"currency":"en-GB","date":"2026-08-18T00:00:00.000Z","description":"tesco","transactionType":"DEB","deleted":0,"id":"","credit":825.99,"debit":0}]}' \
http://localhost:3000/transaction/create-many
