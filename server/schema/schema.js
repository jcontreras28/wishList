const graphql = require('graphql');
const _ = require('lodash');
const Member = require('../models/member');
const Group = require('../models/group');
const GroupRole = require('../models/groupRole');
const Wish = require('../models/wish');
const WishImage = require('../models/wishImage');
const MemberToGroupMap = require('../models/memberToGroupMap');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const GroupRolesType = new GraphQLObjectType({
    name: "GroupRole",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const MemberToGroupMapType = new GraphQLObjectType({
    name: "MemberGroups",
    fields: () => ({
        id: { type: GraphQLID },
        memberId: { type: GraphQLID },
        groupId: { type: GraphQLID },
        roleId: { type: GraphQLID },
        member: {
            type: MemberType,
            resolve(parent, args) {
                //return _.find(members, { id: parent.memberId });
                return Member.findById(parent.memberId)
            }
        },
        group: {
            type: GroupType,
            resolve(parent, args) {
                //return _.find(groups, { id: parent.groupId });
                return Group.findById(parent.groupId);
            }
        },
        role: {
            type: GroupRolesType,
            resolve(parent, args) {
                //return _.find(groupRoles, { id: parent.roleId });
                return GroupRole.findById(parent.roleId);
            }
        }
    })
})

const WishType = new GraphQLObjectType({
    name: "Wish",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        links: { type: GraphQLString },
        status: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        member: {
            type: MemberType,
            resolve(parent, args) {
                //return _.find(members, { id: parent.memberId });
                return Member.findById(parent.memberId)
            }
        },
        imageList: {
            type: GraphQLList(ImageToWishMapType),
            resolve(parent, args) {
                //return _.filter(wishImages, { wishId: parent.id })
                return WishImage.find({ id: parent.wishId });
            }
        }
    })
});

const MemberType = new GraphQLObjectType({
    name: "Member",
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        fbid: { type: GraphQLString },
        wishes: {
            type: GraphQLList(WishType),
            resolve(parent, args) {
                return Wish.find({ memberId: parent.id })
            }
        },
        groups: {
            type: GraphQLList(MemberToGroupMapType),
            resolve(parent, args) {
                return MemberToGroupMap.find({ memberId: parent.id });
            }
        }
    })
});

const ImageToWishMapType = new GraphQLObjectType({
    name: "ImageToWishMap",
    fields: () => ({
        id: { type: GraphQLID },
        wishId: { type: GraphQLString },
        imageName: { type: GraphQLString },
        wish: {
            type: WishType,
            resolve(parent, args) {
                //return _.find(wishImages, { wishId: parent.id });
                return WishImage.find({ wishId: parent.id });
            }
        }
    })
})

const GroupType = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        members: {
            type: GraphQLList(MemberToGroupMapType),
            resolve(parent, args) {
                //return _.filter(memberToGroupMaps, { groupId: parent.id });
                return MemberToGroupMap.find({ groupId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        wish: {
            type: WishType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(wishes, { id: args.id });
                return Wish.findById(args.id);
            }
        },
        member: {
            type: MemberType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(members, { id: args.id });
                return Member.findById(args.id);
            }
        },
        memberByFBid: {
            type: MemberType,
            args: { fbid: { type: GraphQLString } },
            resolve(parent, args) {
                return Member.findOne({ fbid: args.fbid });
            }
        },
        group: {
            type: GroupType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(groups, { id: args.id });
                return Group.findById(args.id);
            }
        },
        memberToGroupMap: {
            type: MemberToGroupMapType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(memberToGroupMaps, { id: args.id });
                return MemberToGroupMap.findById(args.id);
            }
        },
        groupRole: {
            type: GroupRolesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(groupRoles, { id: args.id });
                return GroupRole.findById(args.id);
            }
        },
        imageToWishMap: {
            type: ImageToWishMapType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(wishImages, { id: args.id });
                return ImageToWish.findById(args.id);
            }
        },
        wishes: {
            type: GraphQLList(WishType),
            resolve(parent, args) {
                //return wishes
                return Wish.find({});
            }
        },
        members: {
            type: GraphQLList(MemberType),
            resolve(parent, args) {
                //return members
                return Member.find({});
            }
        },
        groups: {
            type: GraphQLList(GroupType),
            resolve(parent, args) {
                //return groups
                return Group.find({});
            }
        },
        memberToGroupMaps: {
            type: GraphQLList(MemberToGroupMapType),
            resolve(parent, args) {
                //return memberToGroupMaps
                return MemberToGroupMap.find({});
            }
        },
        groupRoles: {
            type: GraphQLList(GroupRolesType),
            resolve(parent, args) {
                //return groupRoles
                return GroupRole.find({});
            }
        },
        imageToWishMaps: {
            type: GraphQLList(ImageToWishMapType),
            resolve(parent, args) {
                //return wishImages
                return WishImage.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWish: {
            type: WishType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                links: { type: GraphQLString },
                memberId: { type: new GraphQLNonNull(GraphQLString) },
                wishStatus: { type: new GraphQLNonNull(GraphQLString) },
                createdAt: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let wish = new Wish({
                    title: args.title,
                    description: args.description,
                    links: args.links,
                    memberId: args.memberId,
                    wishStatsId: args.wishStatsId,
                    createdAt: args.createdAt
                });
                return wish.save();
            }
        },
        addMember: {
            type: MemberType,
            args: {
                fbid: { type: new GraphQLNonNull(GraphQLString) },
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                lastname: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let member = new Member({
                    _id: args.id,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    fbid: args.fbid
                });
                return member.save();
            }
        },
        addGroupRole: {
            type: GroupRolesType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let groupRole = new GroupRole({
                    name: args.name
                });
                return groupRole.save();
            }
        },
        addMemberToGroupMap: {
            type: MemberToGroupMapType,
            args: {
                memberId: { type: new GraphQLNonNull(GraphQLString) },
                groupId: { type: new GraphQLNonNull(GraphQLString) },
                roleId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let memberToGroupMap = new MemberToGroupMap({
                    memberId: args.memberId,
                    groupId: args.groupId,
                    roleId: args.roleId
                });
                return memberToGroupMap.save();
            }
        },
        addImageToWishMap: {
            type: ImageToWishMapType,
            args: {
                wishId: { type: new GraphQLNonNull(GraphQLString) },
                imageName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let imageToWishMap = new WishImage({
                    wishId: args.wishId,
                    imageName: args.imageName
                });
                return imageToWishMap.save();
            }
        },
        addGroup: {
            type: GroupType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString }
            },
            resolve(parent, args) {
                let group = new Group({
                    name: args.name,
                    description: args.description
                });
                return group.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});