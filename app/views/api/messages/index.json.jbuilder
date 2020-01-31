json.array! @messages do |message|
  json.text message.text
  json.image message.image.url
  json.created_at message.created_at.to_s
  json.user_name message.user.name
  json.id message.id
end