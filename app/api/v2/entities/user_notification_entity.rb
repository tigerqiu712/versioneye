require 'grape'

require_relative 'user_entity.rb'
require_relative 'notification_entity.rb'

module V2
  module Entities
    class UserNotificationEntity < Grape::Entity
      expose :user_info, using: Entities::UserEntity, as: "user"
      expose :unread
      expose :notifications, :using => Entities::NotificationEntity
    end
  end
end
