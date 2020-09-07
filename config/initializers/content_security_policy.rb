Rails.application.config.content_security_policy do |p|
  if Rails.env.development?
    p.connect_src :self, :https, 'http://localhost:8081', 'ws://localhost:8081'
  end
end