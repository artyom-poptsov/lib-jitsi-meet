/**
 * Strophe plugin to implement the vCard extension.
 *   <http://xmpp.org/extensions/xep-0054.html>
 *
 * Author: Artyom V. Poptsov <poptsov.artyom@gmail.com>
 *
 * This code is based on "strophejs-plugin-vcard"
 *   <https://github.com/strophe/strophejs-plugin-vcard>
 *
 * Authors of the original plugin:
 *   - Nathan Zorn (nathan.zorn@gmail.com)
 *   - AMD support by JC Brand
 */

import { $iq, Strophe } from 'strophe.js';

import ConnectionPlugin from './ConnectionPlugin';

/**
 *  Logs raw stanzas and makes them available for download as JSON
 */
export default class VCardConnectionPlugin extends ConnectionPlugin {
    buildIq(type, jid, vCardEl) {
        var iq = $iq(jid ? {type: type, to: jid} : {type: type});
        iq.c("vCard", {xmlns: Strophe.NS.VCARD});
        if (vCardEl) {
            iq.cnode(vCardEl);
        }
        return iq;
    }

    /**
     *
     */
    constructor(xmpp) {
        super();
    }

    /**
     *
     * @param connection
     */
    init(connection) {
        super.init(connection);
        Strophe.addNamespace('VCARD', 'vcard-temp');
    }

    /* Function
     * Retrieve a vCard for a JID/Entity
     * Parameters:
     * (Function) handler_cb - The callback function used to handle the request.
     * (String) jid - optional - The name of the entity to request the vCard
     *     If no jid is given, this function retrieves the current user's vcard.
     * */
    get(handler_cb, jid, error_cb) {
        var iq = this.buildIq("get", jid);
        return this.connection.sendIQ(iq, handler_cb, error_cb);
    }

    /* Function
     *  Set an entity's vCard.
     */
    set(handler_cb, vCardEl, jid, error_cb) {
        var iq = this.buildIq("set", jid, vCardEl);
        return this.connection.sendIQ(iq, handler_cb, error_cb);
    }
}
