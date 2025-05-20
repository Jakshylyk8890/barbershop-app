# import requests
# import json

# ACCESS_TOKEN = "EAAdaMa888WUBOyBaeS99ayaZBr6k2Vj1tuRfWGOR64vfkFgH6WL6dzenIvbbCkEKtZCaOwiocGrPbiGCNwK0xlXarNWZAsfaa6Ro4DOFvUAxDHayzCPYTlnVljCmy40UEyuRKvrNhOT6IY1aZBNpCnIwbwwYFFuXBaEe56DOG1oAoTa3EC0jbUPwE9CBPTbSPZCdq1L0uzPHCwBZCW4S9GElChHmj4PieNFoh3dhsZD"
# PHONE_NUMBER_ID = "638288839371991"

# def send_whatsapp_message(to_phone, appointment=None):
#     print(f"📲 Sending WhatsApp to: {to_phone}")

#     url = f"https://graph.facebook.com/v17.0/{PHONE_NUMBER_ID}/messages"
#     headers = {
#         "Authorization": f"Bearer {ACCESS_TOKEN}",
#         "Content-Type": "application/json"
#     }

#     payload = {
#         "messaging_product": "whatsapp",
#         "to": to_phone,
#         "type": "template",
#         "template": {
#             "name": "hello_world",  # ✅ Valid template for test
#             "language": {"code": "en_US"}
#         }
#     }

#     response = requests.post(url, headers=headers, data=json.dumps(payload))
#     print(f"✅ WhatsApp response status: {response.status_code}")
#     print(f"✅ WhatsApp response text: {response.text}")
#     return response.status_code, response.text
