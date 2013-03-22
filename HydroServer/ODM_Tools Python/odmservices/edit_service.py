from odmdata.session_factory import SessionFactory
from odmdata.site import Site
from odmdata.variable import Variable
from odmdata.unit import Unit
from odmdata.series import Series
from odmdata.data_value import DataValue
from odmdata.quality_control_level import QualityControlLevel
from odmdata.qualifier import Qualifier


class EditService():

    def __init__(self, cursor=None, connection_string="", debug=False):
        if (connection_string is not ""):
            self._session_factory = SessionFactory(connection_string, debug)
        elif (factory is not None):
            self._session_factory = factory
        else:
            # One or the other must be set
            print "Must have either a connection string or session factory"
            # TODO throw an exception

        self._edit_session = self._session_factory.get_session()
        self._debug = debug

        if cursor == None:
            # TODO
            # build it ourselves (series selector init)
            pass
        else:
            self._cursor = cursor

        # [(ID, value, datetime), ...]
        self._cursor.execute("SELECT  ValueID, DataValue, LocalDateTime FROM DataValuesEdit ORDER BY LocalDateTime")
        results = self._cursor.fetchall()

        self._active_series = results
        self._active_points = results


    # operator is a character, either '<' or '>'
    def filter_value(self, value, operator):
        if operator == '<': # less than
            tmp = []
            for x in self._active_points:
                if x[1] < value:
                    tmp.append(x)
            self._active_points = tmp
        if operator == '>': # greater than
            tmp = []
            for x in self._active_points:
                if x[1] > value:
                    tmp.append(x)
            self._active_points = tmp

    def filter_date(self, before, after):
        if before != None:
            tmp = []
            for x in self._active_points:
                if x[2] < before:
                    tmp.append(x)
            self._active_points = tmp
        if after != None:
            tmp = []
            for x in self._active_points:
                if x[2] > after:
                    tmp.append(x)
            self._active_points = tmp


    def reset(self):
        self._active_points = self._active_series
    def save(self):
        # Save to sqlite memory DB, not real DB
        pass

    def full_save(self):
        # Save to real DB
        pass

    def get_active_series(self):
        return self._active_series

    def get_active_points(self):
        return self._active_points

    def get_plot_list(self):
        dv_list = [0] * len(self._active_series)
        if self._active_points != self._active_series:
            id_list = [x[0] for x in self._active_points]
            for i in range(len(self._active_series)):
                if self._active_series[i][0] in id_list:
                    dv_list[i] = 1

        return dv_list

    def add_point(self, point):
        # add to active_series and _points,
        # save to sqlite DB
        pass


    def reconcile_dates(self, parent_series_id):
        # append new data to this series
        pass