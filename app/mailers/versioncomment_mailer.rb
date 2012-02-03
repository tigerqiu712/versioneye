class VersioncommentMailer < ActionMailer::Base
  default from: "\"VersionEye\" <notify@versioneye.com>"
  
  def versioncomment_email(product, follower, user, comment)
    @prod = product
    @follower = follower
    @user = user
    @commentlink = "#{configatron.server_url}/vc/#{comment.id}"
    mail(
      :to => @follower.email, 
      :subject => "Comment on Product",
      :tag => "versioncomment"
      )
  end
  
end